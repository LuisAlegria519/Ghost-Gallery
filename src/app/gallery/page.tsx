'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function GalleryLogic() {
  const searchParams = useSearchParams();
  const building = searchParams.get('b');
  const floor = searchParams.get('f');
  
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!building || !floor) {
      setIsAuthorized(false);
      return;
    }

    try {
      const unlocks = JSON.parse(localStorage.getItem('ghost_gallery_unlocks') || '{}');
      const key = `${building}-${floor}`;
      const expiry = unlocks[key];

      if (expiry && new Date(expiry) > new Date()) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (e) {
      setIsAuthorized(false);
    }
  }, [building, floor]);

  useEffect(() => {
    if (isAuthorized === true) {
      window.location.href = `/ar.html?b=${building}&f=${floor}`;
    }
  }, [isAuthorized, building, floor]);

  if (isAuthorized === null) {
    return (
      <div className="container" style={{ justifyContent: 'center' }}>
        <p className="animate-pulse text-gradient">Checking access...</p>
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h2 style={{ color: 'var(--accent-magenta)', marginBottom: '16px' }}>Access Denied</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            You have not unlocked this area of the Ghost Gallery, or your access has expired. 
            Find the QR code in Building {building || '?'} on Floor {floor || '?'} to unlock it!
          </p>
          <Link href="/" className="glass-button">Back Home</Link>
        </div>
      </div>
    );
  }

  if (isAuthorized === true) {
    return (
      <div className="container" style={{ justifyContent: 'center' }}>
        <p className="animate-pulse text-gradient">Opening AR Camera...</p>
      </div>
    );
  }

  return null;
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="container"><p>Loading AR Gallery...</p></div>}>
      <GalleryLogic />
    </Suspense>
  );
}
