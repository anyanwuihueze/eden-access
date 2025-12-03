import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { supabase } from '@/lib/supabaseClient';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req: NextRequest) {
  try {
    const { accessCode } = await req.json();

    const {  data: visit, error } = await supabase
      .from('guest_visits')
      .select('resident_name, resident_phone, guest_name')
      .eq('access_code', accessCode)
      .single();

    if (error || !visit) {
      return NextResponse.json({ error: 'Visit not found' }, { status: 404 });
    }

    const twimlUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/voice-agent/scripts/resident-arrival?residentName=${encodeURIComponent(visit.resident_name)}&guestName=${encodeURIComponent(visit.guest_name)}`;

    await client.calls.create({
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: visit.resident_phone,
      url: twimlUrl,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Notify resident arrival call error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
