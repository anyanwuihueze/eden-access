import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const guestName = searchParams.get('guestName') || 'Guest';
  const link = searchParams.get('link') || '';

  const cleanLink = link
    .replace(/^https?:\/\//, '')
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const twiml = `
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Amy" language="en-GB">
    Hello ${guestName}! This is Eden Estate Concierge. 
    We are delighted to welcome you. 
    Please visit the following link to complete your entry: ${cleanLink}.
    Thank you, and enjoy your visit!
  </Say>
</Response>`.trim();

  return new NextResponse(twiml, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
