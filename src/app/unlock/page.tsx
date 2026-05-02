'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function UnlockLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('Unlocking...');
  const [unlockedData, setUnlockedData] = useState<{b: string, f: string} | null>(null);

  useEffect(() => {
    const building = searchParams.get('b');
    const floor = searchParams.get('f');

    if (!building || !floor) {
      setStatus('Invalid QR Code. Please scan a valid Ghost Gallery code.');
      return;
    }

    try {
      // Create unlock token valid for 365 days
      const unlocks = JSON.parse(localStorage.getItem('ghost_gallery_unlocks') || '{}');
      
      const key = `${building}-${floor}`;
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 365); // 1 year from now

      unlocks[key] = expiry.toISOString();
      
      localStorage.setItem('ghost_gallery_unlocks', JSON.stringify(unlocks));
      
      setStatus(`Success!`);
      setUnlockedData({ b: building, f: floor });
      
    } catch (err) {
      setStatus('Failed to unlock. Please ensure you are not in private browsing mode.');
    }
  }, [router, searchParams]);

  return (
    <div className="container" style={{ justifyContent: 'center' }}>
      <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        
        {unlockedData ? (
          <>
            <h2 style={{ marginBottom: '16px', color: 'var(--accent-cyan)' }}>Area Unlocked!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              You have successfully unlocked Building {unlockedData.b}, Floor {unlockedData.f} for the next year.
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
