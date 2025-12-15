const fs = require('fs');
const path = require('path');

console.log('=== VAPI SETUP VERIFICATION ===\n');

// Read .env.local
const envPath = path.join(__dirname, '.env.local');
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
  console.log('❌ Cannot read .env.local');
  process.exit(1);
}

// Extract Vapi env vars
const envVars = {
  publicKey: envContent.match(/NEXT_PUBLIC_VAPI_PUBLIC_KEY=(.+)/)?.[1],
  welcomeAssistantId: envContent.match(/NEXT_PUBLIC_VAPI_WELCOME_ASSISTANT_ID=(.+)/)?.[1],
  checkoutAssistantId: envContent.match(/NEXT_PUBLIC_VAPI_CHECKOUT_ASSISTANT_ID=(.+)/)?.[1]
};

console.log('📋 Environment Variables Found:');
console.log(`   Public Key: ${envVars.publicKey ? envVars.publicKey.substring(0, 10) + '...' : '❌ MISSING'}`);
console.log(`   Welcome Assistant ID: ${envVars.welcomeAssistantId || '❌ MISSING'}`);
console.log(`   Checkout Assistant ID: ${envVars.checkoutAssistantId || '❌ MISSING'}`);

// Check guest page
const guestPagePath = path.join(__dirname, 'src/app/guest/[accessCode]/page.tsx');
let guestUsesWelcome = false;
let guestUsesCheckout = false;

if (fs.existsSync(guestPagePath)) {
  const guestContent = fs.readFileSync(guestPagePath, 'utf8');
  
  // Check which assistant ID is used
  if (guestContent.includes(envVars.welcomeAssistantId || 'WELCOME_ASSISTANT')) {
    guestUsesWelcome = true;
  }
  if (guestContent.includes(envVars.checkoutAssistantId || 'CHECKOUT_ASSISTANT')) {
    guestUsesCheckout = true;
  }
  
  console.log('\n👤 Guest Page Analysis:');
  console.log(`   Uses Welcome Assistant: ${guestUsesWelcome ? '✅ Yes' : '❌ No'}`);
  console.log(`   Uses Checkout Assistant: ${guestUsesCheckout ? '✅ Yes' : '❌ No'}`);
  
  // Check if using env var correctly
  const usesEnvVar = guestContent.includes('process.env.NEXT_PUBLIC_VAPI');
  console.log(`   Uses process.env: ${usesEnvVar ? '✅ Yes' : '⚠️ Using hardcoded?'}`);
}

// Check checkout button
const checkoutPath = path.join(__dirname, 'src/app/guard/dashboard/components/checkout-button.tsx');
if (fs.existsSync(checkoutPath)) {
  const checkoutContent = fs.readFileSync(checkoutPath, 'utf8');
  const usesCheckoutAssistant = checkoutContent.includes(envVars.checkoutAssistantId || 'CHECKOUT_ASSISTANT');
  
  console.log('\n🛡️ Checkout Button Analysis:');
  console.log(`   Uses Checkout Assistant: ${usesCheckoutAssistant ? '✅ Yes' : '❌ No'}`);
}

console.log('\n=== RECOMMENDATIONS ===');
if (!envVars.publicKey) console.log('1. Add NEXT_PUBLIC_VAPI_PUBLIC_KEY to .env.local');
if (!envVars.welcomeAssistantId) console.log('2. Add NEXT_PUBLIC_VAPI_WELCOME_ASSISTANT_ID to .env.local');
if (!envVars.checkoutAssistantId) console.log('3. Add NEXT_PUBLIC_VAPI_CHECKOUT_ASSISTANT_ID to .env.local');
console.log('4. Run the Vapi API test to verify keys work');
