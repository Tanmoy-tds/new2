import { NextResponse } from 'next/server';
import crypto from 'crypto';

type StoreEntry = { codeHash: string; expiresAt: number; attempts: number; purpose?: string };
const globalAny: any = globalThis as any;
if (!globalAny.__otp_store) globalAny.__otp_store = new Map<string, StoreEntry>();
const store: Map<string, StoreEntry> = globalAny.__otp_store;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const mobile = String(data.mobile || '').trim();
    const code = String(data.code || '').trim();

    if (!/^\d{10}$/.test(mobile) || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ success: false, message: 'Invalid input' }, { status: 400 });
    }

    const entry = store.get(mobile);
    if (!entry) return NextResponse.json({ success: false, message: 'No OTP requested for this number' }, { status: 400 });

    if (Date.now() > entry.expiresAt) {
      store.delete(mobile);
      return NextResponse.json({ success: false, message: 'OTP expired' }, { status: 400 });
    }

    const secret = process.env.OTP_SECRET || 'dev-otp-secret';
    const codeHash = crypto.createHmac('sha256', secret).update(code).digest('hex');

    if (crypto.timingSafeEqual(Buffer.from(codeHash), Buffer.from(entry.codeHash))) {
      store.delete(mobile);
      return NextResponse.json({ success: true, message: 'OTP verified' });
    }

    entry.attempts = (entry.attempts || 0) + 1;
    store.set(mobile, entry);

    if (entry.attempts >= 5) {
      store.delete(mobile);
      return NextResponse.json({ success: false, message: 'Too many attempts, OTP invalidated' }, { status: 429 });
    }

    return NextResponse.json({ success: false, message: 'Invalid OTP' }, { status: 400 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
