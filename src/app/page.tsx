'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
      <div className="glass-panel animate-float" style={{ padding: '40px 24px', width: '100%', maxWidth: '400px' }}>
        
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
          {/* Placeholder for Ghost Logo - Add a pulse animation to the image container */}
          <div className="animate-pulse" style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(0, 243, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent-cyan)', boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)' }}>
            <Image src="/icon.png" alt="Ghost Logo" width={80} height={80} />
          </div>
        </div>

        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', fontWeight: 900 }}>
          <span className="text-gradient">Ghost</span> Gallery
        </h1>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>
          An Augmented Reality exhibition hidden in the hallways of Bunker Hill Community College. 
          Find and scan the physical QR codes on each floor to reveal the art.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link href="/scan" className="glass-button primary">
            Scan QR Code
          </Link>
          
          <Link href="/submit" className="glass-button">
            Submit Art
          </Link>
        </div>
        
        <div style={{ marginTop: '32px' }}>
          <Link href="/admin" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', opacity: 0.5 }}>
            Admin Portal
          </Link>
        </div>
      </div>
    </main>
  );
}
