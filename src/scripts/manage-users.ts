// src/scripts/manage-users.ts
// Run this to add new users easily

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function createUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('✅ User created:', userCredential.user.email);
  } catch (error: any) {
    console.error('❌ Error creating user:', error.message);
  }
}

// Add your users here
async function setupUsers() {
  console.log('🔧 Creating users...\n');
  
  await createUser('resident@test.com', 'resident123');
  await createUser('guard@edenestate.com', 'guard123');
  await createUser('admin@edenestate.com', 'admin123');
  
  console.log('\n✅ All users created!');
  process.exit(0);
}

setupUsers();
