const fs = require('fs');
const path = require('path');

const guestPagePath = path.join(__dirname, 'src/app/guest/[accessCode]/page.tsx');
if (!fs.existsSync(guestPagePath)) {
  console.log('❌ Guest page not found');
  process.exit(1);
}

const content = fs.readFileSync(guestPagePath, 'utf8');

// Extract Vapi related code
console.log('📞 Guest Page Vapi Analysis:\n');

// Find checkin flow
const checkinMatch = content.match(/const checkinId = (.*?);/s);
if (checkinMatch) {
  console.log('1. Checkin Assistant ID assignment:');
  console.log(`   ${checkinMatch[0]}`);
}

// Find where assistant ID is used
if (content.includes('start(')) {
  const startCall = content.match(/start\(([^)]+)\)/);
  if (startCall) {
    console.log('\n2. Vapi start() call:');
    console.log(`   start(${startCall[1]})`);
  }
}

// Check environment variables used
const envVars = content.match(/process\.env\.([A-Z_]+)/g);
if (envVars) {
  console.log('\n3. Environment variables referenced:');
  const uniqueVars = [...new Set(envVars)];
  uniqueVars.forEach(v => console.log(`   ${v}`));
}

// Check if there's checkout flow too
if (content.includes('checkout') || content.includes('CHECKOUT')) {
  console.log('\n4. Checkout flow detected: Yes');
} else {
  console.log('\n4. Checkout flow detected: No');
}

// Check the actual lines around checkin
console.log('\n5. Relevant code section:');
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('checkin') || line.includes('CHECKIN') || line.includes('start(')) {
    console.log(`   Line ${i+1}: ${line.trim().substring(0, 80)}`);
  }
});
