import { NextRequest, NextResponse } from 'next/server';
import { generateGuestAccessCode } from '@/ai/flows/generate-guest-access-code';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await generateGuestAccessCode(body);
  return NextResponse.json(result);
}
