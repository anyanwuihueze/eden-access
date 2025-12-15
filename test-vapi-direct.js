console.log('=== DIRECT VAPI API TEST ===\n');

// Test using curl via child process
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const VAPI_PUBLIC_KEY = '6e884905-618d-45b1-9bb3-8aeb9356b0cf';
const WELCOME_ASSISTANT_ID = '0f5fae2a-f764-44c0-8306-5d32a2bb509f';
const CHECKOUT_ASSISTANT_ID = '5b0a93f7-5129-461d-95b8-9defb8d7383e';

async function testWithCurl(assistantId, name) {
  console.log(`Testing ${name} Assistant (ID: ${assistantId})...`);
  
  const curlCommand = `curl -s -X GET \\
    "https://api.vapi.ai/assistant/${assistantId}" \\
    -H "Authorization: Bearer ${VAPI_PUBLIC_KEY}" \\
    -H "Content-Type: application/json" \\
    --max-time 10`;
  
  try {
    const { stdout, stderr } = await execPromise(curlCommand);
    
    if (stderr && stderr.includes('error')) {
      console.log(`   ❌ Error: ${stderr.substring(0, 100)}`);
      return false;
    }
    
    if (stdout.includes('"error"') || stdout.includes('"message"')) {
      console.log(`   ❌ API Error: ${stdout.substring(0, 150)}`);
      return false;
    }
    
    console.log(`   ✅ Success! Assistant is accessible`);
    
    // Try to parse and show some info
    try {
      const data = JSON.parse(stdout);
      console.log(`   Name: ${data.name || 'Not specified'}`);
      console.log(`   Model: ${data.model?.provider || 'Not specified'}`);
      console.log(`   Voice: ${data.voice?.name || 'Not specified'}`);
    } catch (e) {
      // Just showing it works is enough
    }
    
    return true;
    
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message.substring(0, 100)}`);
    return false;
  }
}

async function runTests() {
  console.log('Testing Vapi API connectivity...\n');
  
  const welcomeOk = await testWithCurl(WELCOME_ASSISTANT_ID, 'Welcome');
  console.log('');
  const checkoutOk = await testWithCurl(CHECKOUT_ASSISTANT_ID, 'Checkout');
  
  console.log('\n=== TEST SUMMARY ===');
  console.log(`Welcome Assistant: ${welcomeOk ? '✅ WORKING' : '❌ FAILED'}`);
  console.log(`Checkout Assistant: ${checkoutOk ? '✅ WORKING' : '❌ FAILED'}`);
  
  if (welcomeOk && checkoutOk) {
    console.log('\n🎉 Excellent! Both Vapi assistants are working.');
    console.log('Your API keys are valid and assistants are accessible.');
  } else {
    console.log('\n⚠️ Issues detected:');
    console.log('1. Check if assistants are published in Vapi dashboard');
    console.log('2. Verify API key has correct permissions');
    console.log('3. Ensure assistant IDs are correct');
  }
}

runTests();
