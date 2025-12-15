console.log('🚀 Quick Vapi Test\n');

const VAPI_KEY = '6e884905-618d-45b1-9bb3-8aeb9356b0cf';
const ASSISTANTS = {
  welcome: '0f5fae2a-f764-44c0-8306-5d32a2bb509f',
  checkout: '5b0a93f7-5129-461d-95b8-9defb8d7383e'
};

console.log('Testing API key format...');
console.log(`Key: ${VAPI_KEY.substring(0, 8)}...${VAPI_KEY.substring(VAPI_KEY.length-4)}`);
console.log(`Length: ${VAPI_KEY.length} characters`);
console.log(`Format: ${VAPI_KEY.match(/^[0-9a-f-]+$/) ? '✅ Valid UUID format' : '❌ Invalid format'}`);

console.log('\nTesting Assistant IDs...');
Object.entries(ASSISTANTS).forEach(([name, id]) => {
  console.log(`${name}: ${id}`);
  console.log(`  Length: ${id.length} characters`);
  console.log(`  Format: ${id.match(/^[0-9a-f-]+$/) ? '✅ Valid UUID' : '❌ Invalid format'}`);
});

console.log('\n📋 Issue identified:');
console.log('Your guest page expects: NEXT_PUBLIC_VAPI_CHECKIN_ASSISTANT_ID');
console.log('Your .env.local has: NEXT_PUBLIC_VAPI_CHECKOUT_ASSISTANT_ID');
console.log('\n💡 Solution: Add to .env.local:');
console.log('NEXT_PUBLIC_VAPI_CHECKIN_ASSISTANT_ID=<your-checkin-assistant-id>');
console.log('\nOr use the same assistant for both by adding to .env.local:');
console.log('NEXT_PUBLIC_VAPI_CHECKIN_ASSISTANT_ID=5b0a93f7-5129-461d-95b8-9defb8d7383e');
