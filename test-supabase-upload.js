const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bvsrzbvfniomzamhdzfs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2c3J6YnZmbmlvbXphbWhkemZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MTI3OTgsImV4cCI6MjA4MDA4ODc5OH0.yfb1I1Ni4jj3w0gffArDBpNagJk2L4NkL1fCbQs5LQM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpload() {
  console.log('🧪 Testing Supabase connection...');
  
  const testFileName = `selfies/test-${Date.now()}.jpg`;
  const testContent = 'This is a test file to verify upload works';
  
  console.log(`📤 Uploading to: ${testFileName}`);
  
  const { data, error } = await supabase.storage
    .from('my-selfies')
    .upload(testFileName, testContent, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) {
    console.error('❌ Upload FAILED:', error);
    return;
  }

  console.log('✅ Upload SUCCESS:', data);

  const { data: urlData } = supabase.storage
    .from('my-selfies')
    .getPublicUrl(testFileName);

  console.log('🔗 Public URL:', urlData.publicUrl);
  console.log('\n✅ Supabase is working correctly!');
}

testUpload();
