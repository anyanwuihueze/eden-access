import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const residentName = searchParams.get('residentName') || 'Resident';
  const guestName = searchParams.get('guestName') || 'your guest';

  const twiml = `
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Amy" language="en-GB">
    Good day, ${residentName}. 
    Your guest ${guestName} has just submitted their entry selfie. 
    They are now awaiting confirmation at the gate. 
    Have a wonderful day at Eden Estate.
  </Say>
</Response>`.trim();

  return new NextResponse(twiml, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
