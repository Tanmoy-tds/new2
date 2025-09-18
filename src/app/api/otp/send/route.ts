import { NextResponse } from 'next/server';
import crypto from 'crypto';

type StoreEntry = { codeHash: string; expiresAt: number; attempts: number; purpose?: string };

// Simple in-memory store. For production use persistent store like Redis.
const globalAny: any = globalThis as any;
if (!globalAny.__otp_store) globalAny.__otp_store = new Map<string, StoreEntry>();
const store: Map<string, StoreEntry> = globalAny.__otp_store;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const mobile = String(data.mobile || '').trim();
    const purpose = data.purpose || 'general';

    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json({ success: false, message: 'Invalid mobile number' }, { status: 400 });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const secret = process.env.OTP_SECRET || 'dev-otp-secret';
    const codeHash = crypto.createHmac('sha256', secret).update(code).digest('hex');
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    store.set(mobile, { codeHash, expiresAt, attempts: 0, purpose });

    // In production: integrate with SMS provider (Twilio, etc.). Here we simulate by logging.
    // eslint-disable-next-line no-console
    console.info(`Simulated SMS to ${mobile}: OTP=${code}`);

    return NextResponse.json({ success: true, message: 'OTP sent (simulated)' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
