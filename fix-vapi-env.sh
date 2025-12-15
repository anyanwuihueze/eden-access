#!/bin/bash
echo "Fixing Vapi environment variables..."

ENV_FILE=".env.local"

# Check if CHECKIN_ASSISTANT_ID exists
if ! grep -q "NEXT_PUBLIC_VAPI_CHECKIN_ASSISTANT_ID" "$ENV_FILE"; then
    echo "❌ NEXT_PUBLIC_VAPI_CHECKIN_ASSISTANT_ID not found in .env.local"
    
    # Get checkout assistant ID to use for checkin too
    CHECKOUT_ID=$(grep "NEXT_PUBLIC_VAPI_CHECKOUT_ASSISTANT_ID" "$ENV_FILE" | cut -d= -f2)
    
    if [ -n "$CHECKOUT_ID" ]; then
        echo "✅ Found checkout assistant ID: $CHECKOUT_ID"
        echo "Adding checkin assistant ID using same value..."
        echo "NEXT_PUBLIC_VAPI_CHECKIN_ASSISTANT_ID=$CHECKOUT_ID" >> "$ENV_FILE"
        echo "✅ Added NEXT_PUBLIC_VAPI_CHECKIN_ASSISTANT_ID=$CHECKOUT_ID"
    else
        echo "❌ Could not find checkout assistant ID either"
        echo "Please add to .env.local:"
        echo "NEXT_PUBLIC_VAPI_CHECKIN_ASSISTANT_ID=<your-checkin-assistant-id>"
    fi
else
    echo "✅ NEXT_PUBLIC_VAPI_CHECKIN_ASSISTANT_ID already exists"
fi

echo ""
echo "Updated .env.local Vapi variables:"
grep "NEXT_PUBLIC_VAPI" "$ENV_FILE"
