
import { NextResponse } from 'next/server';
import { supabase, isSupabaseAvailable } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!isSupabaseAvailable()) {
    return NextResponse.json({ error: 'Database service unavailable' }, { status: 503 });
  }

  try {
    const { accessCode, selfieUrl } = await req.json();

    if (!accessCode || !selfieUrl) {
      return NextResponse.json({ error: 'Missing accessCode or selfieUrl' }, { status: 400 });
    }

    const { data, error } = await supabase!
      .from('guest_visits')
      .update({ selfie_url: selfieUrl, status: 'pending_approval' })
      .eq('access_code', accessCode)
      .select();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: 'Failed to update visit' }, { status: 500 });
    }

    // Optional: Notify resident via voice agent
    // This can be uncommented once the flow is finalized
    // await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/voice-agent/notify-resident-selfie`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ accessCode }),
    // });

    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error('Update selfie request error:', e);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
