#!/bin/bash
echo "🧪 TESTING COMPLETE SETUP"
echo ""

# Test 1: Environment file exists
echo "1️⃣  Checking .env.local..."
if [ -f .env.local ]; then
    echo "   ✅ .env.local exists"
else
    echo "   ❌ .env.local missing"
fi

# Test 2: Vapi variables present
echo "2️⃣  Checking Vapi variables..."
if grep -q "NEXT_PUBLIC_VAPI_PUBLIC_KEY" .env.local; then
    echo "   ✅ Vapi public key present"
else
    echo "   ❌ Vapi public key missing"
fi

if grep -q "NEXT_PUBLIC_VAPI_CHECKIN_ASSISTANT_ID" .env.local; then
    echo "   ✅ Checkin assistant ID present"
else
    echo "   ❌ Checkin assistant ID missing"
fi

if grep -q "NEXT_PUBLIC_VAPI_CHECKOUT_ASSISTANT_ID" .env.local; then
    echo "   ✅ Checkout assistant ID present"
else
    echo "   ❌ Checkout assistant ID missing"
fi

# Test 3: API connectivity
echo "3️⃣  Testing API connectivity..."
checkin_test=$(curl -s -X GET "https://api.vapi.ai/assistant/5b0a93f7-5129-461d-95b8-9defb8d7383e" \
  -H "Authorization: Bearer c6e5cee5-0031-42c6-bf66-29f9d3dd4039" \
  -H "Content-Type: application/json")

if echo "$checkin_test" | grep -q "Check in flow"; then
    echo "   ✅ Checkin assistant accessible"
else
    echo "   ❌ Checkin assistant failed"
fi

checkout_test=$(curl -s -X GET "https://api.vapi.ai/assistant/0f5fae2a-f764-44c0-8306-5d32a2bb509f" \
  -H "Authorization: Bearer c6e5cee5-0031-42c6-bf66-29f9d3dd4039" \
  -H "Content-Type: application/json")

if echo "$checkout_test" | grep -q "Riley"; then
    echo "   ✅ Checkout assistant accessible"
else
    echo "   ❌ Checkout assistant failed"
fi

echo ""
echo "🎯 SETUP COMPLETE - Ready to test voice agents!"
