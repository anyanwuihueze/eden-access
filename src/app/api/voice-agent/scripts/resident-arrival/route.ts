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
    Your guest ${guestName} has been cleared at the main gate 
    and is now en route to your residence. 
    Eden Estate Concierge, signing off.
  </Say>
</Response>`.trim();

  return new NextResponse(twiml, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
