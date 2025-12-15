#!/bin/bash
echo "Testing Checkin Assistant..."
curl -s -X GET "https://api.vapi.ai/assistant/5b0a93f7-5129-461d-95b8-9defb8d7383e" \
  -H "Authorization: Bearer 6e884905-618d-45b1-9bb3-8aeb9356b0cf" \
  -H "Content-Type: application/json" \
  --max-time 5 | head -1

echo ""
echo "Testing Checkout Assistant..."
curl -s -X GET "https://api.vapi.ai/assistant/0f5fae2a-f764-44c0-8306-5d32a2bb509f" \
  -H "Authorization: Bearer 6e884905-618d-45b1-9bb3-8aeb9356b0cf" \
  -H "Content-Type: application/json" \
  --max-time 5 | head -1

echo ""
echo "✅ If you see JSON response = Keys WORK"
echo "❌ If you see 'Invalid Key' = Need NEW public key"
