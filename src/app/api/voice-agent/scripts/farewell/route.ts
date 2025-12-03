import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const guestName = searchParams.get('guestName') || 'Guest';

  const twiml = `
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Amy" language="en-GB">
    Thank you for visiting Eden Estate, ${guestName}! 
    We hope you enjoyed your stay. 
    Did everything go smoothly at the gate today? 
    We would love your feedback. 
    Safe travels, and visit us again soon!
  </Say>
</Response>`.trim();

  return new NextResponse(twiml, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
