
import { NextResponse } from 'next/server';
import { supabase, isSupabaseAvailable } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!isSupabaseAvailable()) {
    return NextResponse.json({ error: 'Database service unavailable' }, { status: 503 });
  }

  try {
    const { accessCode } = await req.json();

    if (!accessCode) {
      return NextResponse.json({ error: 'Access code is required' }, { status: 400 });
    }

    const { data, error } = await supabase!
      .from('guest_visits')
      .update({ status: 'checked_out', checked_out_at: new Date().toISOString() })
      .eq('access_code', accessCode)
      .select();

    if (error) {
      console.error('Check-out error:', error);
      return NextResponse.json({ error: 'Failed to check out guest' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error('Check-out request error:', e);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
