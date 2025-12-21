
import { NextResponse } from 'next/server';
import { supabase, isSupabaseAvailable } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!isSupabaseAvailable()) {
    return NextResponse.json({ error: 'Database service unavailable' }, { status: 503 });
  }

  try {
    const { id, access_code } = await req.json();

    if (!id || !access_code) {
      return NextResponse.json({ error: 'Visit ID and access code are required' }, { status: 400 });
    }

    // 1. Delete the selfie from storage
    const selfiePath = `selfies/${access_code}.jpg`;
    const { error: storageError } = await supabase!.storage
      .from('my-selfies')
      .remove([selfiePath]);

    if (storageError) {
      // Log the error but don't block the status update if the file doesn't exist
      console.warn(`Could not delete selfie ${selfiePath}:`, storageError.message);
    }

    // 2. Update the visit status to 'denied'
    const { data, error: dbError } = await supabase!
      .from('guest_visits')
      .update({ status: 'denied' })
      .eq('id', id)
      .select();

    if (dbError) {
      console.error('Deny visit DB error:', dbError);
      return NextResponse.json({ error: 'Failed to deny visit' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error('Deny visit request error:', e);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
