
import { NextResponse } from 'next/server';
import { supabase, isSupabaseAvailable } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isSupabaseAvailable()) {
    return NextResponse.json({ error: 'Database service unavailable' }, { status: 503 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { data, error } = await supabase!
      .from('guest_visits')
      .select('*')
      .gte('created_at', today.toISOString())
      .lt('created_at', tomorrow.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch today\'s visits' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error('Today\'s visits request error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
