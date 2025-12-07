import { NextResponse } from 'next/server';
import { supabase, isSupabaseAvailable } from '@/lib/supabaseClient';

// 🔥 CRITICAL: This prevents Next.js from trying to run this at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Explicitly set runtime

export async function POST(req: Request) {
  // Check if Supabase is available
  if (!isSupabaseAvailable()) {
    return NextResponse.json(
      { error: 'Database service temporarily unavailable' },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    
    const { error } = await supabase!
      .from('guest_visits')
      .insert({
        access_code: body.accessCode,
        guest_name: body.guestName,
        guest_phone: body.guestPhone,
        resident_name: body.residentName,
        resident_phone: body.residentPhone,
        status: 'pending',
      });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

// Also add a GET handler (prevents build issues)
export async function GET() {
  return NextResponse.json({ 
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
}
