
import { NextResponse } from 'next/server';
import { supabase, isSupabaseAvailable } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { accessCode: string } }) {
  const { accessCode } = params;

  if (!isSupabaseAvailable()) {
    return NextResponse.json({ error: 'Database service unavailable' }, { status: 503 });
  }
  
  if (!accessCode) {
    return NextResponse.json({ error: 'Access code is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase!
      .from('guest_visits')
      .select('*')
      .eq('access_code', accessCode)
      .single();

    if (error || !data) {
      console.error('Verification error:', error);
      return NextResponse.json({ error: 'Invalid or expired access code' }, { status: 404 });
    }
    
    // For security, don't return if status is not approved or pending
    if (data.status !== 'approved' && data.status !== 'pending_approval' && data.status !== 'pending') {
      return NextResponse.json({ error: 'This access code is not currently active' }, { status: 403 });
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error('Verify request error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
