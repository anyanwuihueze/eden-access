import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  const body = await req.json();
  
  const { error } = await supabase
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
}
