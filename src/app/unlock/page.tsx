'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function UnlockLogic() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Unlocking...');
  const [unlockedData, setUnlockedData] = useState<{b: string, f: string, isNew: boolean} | null>(null);

  useEffect(() => {
    const building = searchParams.get('b');
    const floor = searchParams.get('f');

    if (!building || !floor) {
      setStatus('Invalid QR Code. Please scan a valid Ghost Gallery code.');
      return;
    }

    try {
      const unlocks = JSON.parse(localStorage.getItem('ghost_gallery_unlocks') || '{}');
      const key = `${building}-${floor}`;
      const now = new Date();
      
      if (unlocks[key] && new Date(unlocks[key]) > now) {
        // Already unlocked and hasn't expired
        setStatus(`Welcome Back!`);
        setUnlockedData({ b: building, f: floor, isNew: false });
      } else {
        // New unlock
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 365); // 1 year from now
        unlocks[key] = expiry.toISOString();
        localStorage.setItem('ghost_gallery_unlocks', JSON.stringify(unlocks));
        
        setStatus(`Success!`);
        setUnlockedData({ b: building, f: floor, isNew: true });
      }
    } catch (err) {
      setStatus('Failed to unlock. Please ensure you are not in private browsing mode.');
    }
  }, [searchParams]);

  return (
    <div className="container" style={{ justifyContent: 'center' }}>
      <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        
        {unlockedData ? (
          <>
            {unlockedData.isNew ? (
              <h2 style={{ marginBottom: '16px', color: 'var(--accent-cyan)' }}>New Area Unlocked!</h2>
            ) : (
              <h2 style={{ marginBottom: '16px', color: 'rgba(255, 0, 255, 0.8)' }}>Welcome Back!</h2>
            )}
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {unlockedData.isNew 
                ? `You have successfully unlocked Building ${unlockedData.b}, Floor ${unlockedData.f} for the next year.`
                : `You've already unlocked Building ${unlockedData.b}, Floor ${unlockedData.f}! Good to see you again.`
              }
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '0.9rem' }}>
              When you're ready, enter the gallery to see the art through your camera.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Link href={`/gallery?b=${unlockedData.b}&f=${unlockedData.f}`} className="glass-button primary">
                Enter AR Gallery
              </Link>
              <Link href="/" className="glass-button">
                Return Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: '16px' }} className="text-gradient">Authenticating...</h2>
            <p>{status}</p>
          </>
        )}

      </div>
    </div>
  );
}

export default function UnlockPage() {
  return (
    <Suspense fallback={<div className="container"><p>Loading...</p></div>}>
      <UnlockLogic />
    </Suspense>
  );
}
