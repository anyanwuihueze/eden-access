const http = require('http');

console.log('Testing local Vapi API endpoint...\n');

const options = {
  hostname: 'localhost',
  port: 9002,
  path: '/api/voice-agent/welcome-guest',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Response: ${data.substring(0, 200)}...`);
    if (res.statusCode === 200) {
      console.log('✅ Local Vapi endpoint is accessible');
    } else {
      console.log('⚠️ Local endpoint returned non-200 status');
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Cannot reach local Vapi endpoint:', error.message);
  console.log('Is the server running on port 9002?');
});

req.on('timeout', () => {
  console.log('❌ Request timeout - server may not be running');
  req.destroy();
});

req.end();
