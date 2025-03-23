#!/bin/bash

# التحقق من وجود المعلمات المطلوبة
if [ -z "$1" ]; then
    echo "⚠️  الرجاء تقديم اسم الملف!"
    echo "الاستخدام: $0 <اسم_الملف> <رسالة_الالتزام>"
    exit 1
fi
if [ -z "$2" ]; then
    echo "⚠️  الرجاء تقديم رسالة التزام!"
    echo "الاستخدام: $0 <اسم_الملف> <رسالة_الالتزام>"
    exit 1
fi

# التحقق مما إذا كان المستودع صالحًا
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
    echo "❌ هذا ليس مستودع Git صالح!"
    exit 1
fi

# اكتشاف الفرع الحالي
CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null)
if [ -z "$CURRENT_BRANCH" ]; then
    echo "❌ فشل في تحديد الفرع الحالي!"
    exit 1
fi

# إضافة التغييرات (مع التعامل الصحيح مع المسافات في اسم الملف)
git add "$1"
if [ $? -ne 0 ]; then
    echo "❌ فشل في إضافة الملف: $1"
    exit 1
fi

# عمل commit بالرسالة المقدمة
git commit -m "$2"
if [ $? -ne 0 ]; then
    echo "❌ فشل في عمل commit!"
    exit 1
fi

# دفع التغييرات إلى الفرع الحالي
git push origin "$CURRENT_BRANCH"
if [ $? -ne 0 ]; then
    echo "❌ فشل في دفع التغييرات إلى الفرع: $CURRENT_BRANCH"
    exit 1
fi

echo "✅ تم دفع التغييرات بنجاح إلى الفرع: $CURRENT_BRANCH"