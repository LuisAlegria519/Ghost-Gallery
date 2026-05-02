'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Link from 'next/link';

export default function ScanPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize the scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
      false
    );

    scanner.render(
      (decodedText) => {
        // Success callback: stop camera first
        scanner.clear().then(() => {
          try {
            if (decodedText.includes('/unlock?')) {
              const url = new URL(decodedText);
              router.push(url.pathname + url.search);
            } else {
              setError("Invalid QR Code. Please scan a Ghost Gallery code.");
              setTimeout(() => {
                setError(null);
                window.location.reload(); 
              }, 3000);
            }
          } catch (e) {
            setError("Unrecognized QR format.");
          }
        }).catch((err) => {
          console.error("Failed to clear scanner", err);
        });
      },
      (errorMessage) => {
        // Ignore regular scanning errors (it fires every frame it doesn't see a QR code)
      }
    );

    return () => {
      try {
        scanner.clear().catch(() => {
          // Ignore clear errors on unmount
        });
      } catch (e) {
        // Ignore synchronous errors
      }
    };
  }, [router]);

  return (
    <div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
      <div className="glass-panel" style={{ padding: '24px', width: '100%', maxWidth: '400px' }}>
        <h2 className="text-gradient" style={{ marginBottom: '16px' }}>Scan Gallery Code</h2>
        
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
        
        <div id="reader" style={{ width: '100%', marginBottom: '24px', borderRadius: '12px', overflow: 'hidden' }}></div>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
          Point your camera at a Ghost Gallery QR code found in the hallways.
        </p>

        <Link href="/" className="glass-button">
          Cancel
        </Link>
      </div>

      <style jsx global>{`
        #reader button {
          background: var(--glass-bg);
          color: white;
          border: 1px solid var(--glass-border);
          padding: 8px 16px;
          border-radius: 8px;
          margin-top: 10px;
          cursor: pointer;
        }
        #reader a { color: var(--accent-cyan); }
        #reader__dashboard_section_csr span { color: white !important; }
      `}</style>
    </div>
  );
}
