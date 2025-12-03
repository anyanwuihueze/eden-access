import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req: NextRequest) {
  try {
    const { guestPhone, guestName, accessLink } = await req.json();

    if (!guestPhone || !guestName || !accessLink) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const twimlUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/voice-agent/scripts/welcome?guestName=${encodeURIComponent(guestName)}&link=${encodeURIComponent(accessLink)}`;

    const call = await client.calls.create({
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: guestPhone,
      url: twimlUrl,
    });

    return NextResponse.json({ success: true, callSid: call.sid });
  } catch (error: any) {
    console.error('Twilio welcome call error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
