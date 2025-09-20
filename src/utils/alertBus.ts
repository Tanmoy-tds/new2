export type AdminAlert = {
  id: string;
  kind: 'panic' | 'sos' | 'anomaly' | 'custom';
  message: string;
  from?: { name?: string; id?: string };
  createdAt: number;
};

// Channel name used across the app
const CHANNEL_NAME = 'admin-alerts-channel';

let channel: BroadcastChannel | null = null;

function getChannel() {
  if (typeof window === 'undefined') return null;
  try {
    if (!channel) channel = new BroadcastChannel(CHANNEL_NAME);
    return channel;
  } catch {
    return null;
  }
}

// Publish alert to BroadcastChannel and also via localStorage event as a fallback
export function publishAlert(alert: AdminAlert) {
  if (typeof window === 'undefined') return;
  const payload = { type: 'ADMIN_ALERT', alert } as const;
  const ch = getChannel();
  try {
    ch?.postMessage(payload);
  } catch {}
  try {
    const key = `${CHANNEL_NAME}:storage`;
    localStorage.setItem(key, JSON.stringify({ ...payload, ts: Date.now() }));
    // Immediately remove to avoid clutter; storage event already fired
    localStorage.removeItem(key);
  } catch {}
}

export type Unsubscribe = () => void;

export function subscribeAlerts(onAlert: (alert: AdminAlert) => void): Unsubscribe {
  if (typeof window === 'undefined') return () => {};
  const ch = getChannel();

  const onMessage = (ev: MessageEvent) => {
    const data = ev?.data;
    if (data && data.type === 'ADMIN_ALERT' && data.alert) onAlert(data.alert as AdminAlert);
  };
  ch?.addEventListener('message', onMessage);

  const onStorage = (e: StorageEvent) => {
    if (!e.key || !e.newValue) return;
    if (e.key.endsWith(':storage')) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (parsed?.type === 'ADMIN_ALERT' && parsed.alert) onAlert(parsed.alert as AdminAlert);
      } catch {}
    }
  };
  window.addEventListener('storage', onStorage);

  return () => {
    ch?.removeEventListener('message', onMessage);
    window.removeEventListener('storage', onStorage);
  };
}
