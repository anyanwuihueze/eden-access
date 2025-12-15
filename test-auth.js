const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bvsrzbvfniomzamhdzfs.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2c3J6YnZmbmlvbXphbWhkemZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MTI3OTgsImV4cCI6MjA4MDA4ODc5OH0.yfb1I1Ni4jj3w0gffArDBpNagJk2L4NkL1fCbQs5LQM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUsers() {
  console.log('Testing user credentials...\n');
  
  const users = [
    { email: 'resident@test.com', password: 'resident123', role: 'resident' },
    { email: 'guard@edenestate.com', password: 'guard123', role: 'guard' },
    { email: 'admin@edenestate.com', password: 'admin123', role: 'admin' }
  ];

  for (const user of users) {
    console.log(`Testing ${user.email}...`);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password
      });
      
      if (error) {
        console.log(`  ❌ Error: ${error.message}`);
      } else {
        console.log(`  ✅ Success! User ID: ${data.user.id}`);
        console.log(`  Role from metadata:`, data.user.user_metadata?.role || 'No role metadata');
      }
    } catch (err) {
      console.log(`  ❌ Exception: ${err.message}`);
    }
    console.log();
  }
}

testUsers();
