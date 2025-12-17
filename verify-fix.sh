#!/bin/bash
echo "🔍 Checking GuestPage params fix..."

if grep -q "export default function GuestPage()" src/app/guest/\[accessCode\]/page.tsx; then
    echo "✅ Function signature fixed"
else
    echo "❌ Function signature still broken"
fi

if grep -q "const params = useParams()" src/app/guest/\[accessCode\]/page.tsx; then
    echo "✅ Using useParams hook"
else
    echo "❌ Still using use(params)"
fi

if grep -q "const accessCode = params?.accessCode" src/app/guest/\[accessCode\]/page.tsx; then
    echo "✅ Access code extraction fixed"
else
    echo "❌ Access code extraction wrong"
fi
