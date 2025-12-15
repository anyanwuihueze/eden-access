
import { NextResponse } from 'next/server';
import { supabase, isSupabaseAvailable } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isSupabaseAvailable()) {
    return NextResponse.json({ error: 'Database service unavailable' }, { status: 503 });
  }

  try {
    const { data, error } = await supabase!
      .from('guest_visits')
      .select('id, guest_name, selfie_url, created_at')
      .eq('status', 'pending_approval')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch pending visits' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error('Pending visits request error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
