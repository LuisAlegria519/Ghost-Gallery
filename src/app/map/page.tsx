'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CampusMap() {
  const [unlocks, setUnlocks] = useState<Record<string, number>>({});
  const [totalUnlocked, setTotalUnlocked] = useState(0);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('ghost_gallery_unlocks') || '{}');
      const counts: Record<string, number> = {};
      let total = 0;
      const validBuildings = ['A', 'B', 'C', 'D', 'E', 'G'];
      
      // data format is {"B-2": "expiry_date"}
      Object.keys(data).forEach(key => {
        const building = key.split('-')[0];
        if (validBuildings.includes(building)) {
          if (!counts[building]) counts[building] = 0;
          counts[building]++;
          total++;
        }
      });
      
      setUnlocks(counts);
      setTotalUnlocked(total);
    } catch(e) {
      console.error(e);
    }
  }, []);

  const getFillColor = (building: string) => {
    const count = unlocks[building] || 0;
    // 20% darker per floor. 0 floors = 100% white (255). 1 floor = 80% (204). 2 floors = 60% (153). 3 floors = 40% (102).
    const lightness = Math.max(0, 255 - (count * 51));
    return `rgb(${lightness}, ${lightness}, ${lightness})`;
  };

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="text-gradient" style={{ marginBottom: '16px' }}>Campus Map</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'center' }}>
        Unlock floors by scanning hidden QR codes across the campus. Each floor you discover permanently darkens the building's signature.
      </p>

      {totalUnlocked >= 18 && (
        <div className="glass-panel" style={{ backgroundColor: 'rgba(0, 243, 255, 0.1)', borderColor: 'var(--accent-cyan)', marginBottom: '32px', padding: '16px 32px', textAlign: 'center', animation: 'pulse 2s infinite', width: '100%', maxWidth: '800px' }}>
          <h2 className="text-gradient" style={{ margin: 0, fontSize: '1.5rem' }}>🏆 CAMPUS COMPLETIONIST! 🏆</h2>
          <p style={{ color: 'white', marginTop: '8px', fontSize: '0.9rem' }}>Congratulations! You have discovered every hidden gallery in Bunker Hill Community College!</p>
        </div>
      )}

      <div className="glass-panel" style={{ padding: '24px', width: '100%', maxWidth: '800px', backgroundColor: 'rgba(255,255,255,0.05)' }}>
        <svg viewBox="0 0 600 400" style={{ width: '100%', height: 'auto' }}>
          <g stroke="black" strokeWidth="4">
            {/* Building G */}
            <path d="M 120,240 L 150,260 L 140,360 L 80,360 L 90,260 Z" fill={getFillColor('G')} />
            <text x="105" y="315" fill={unlocks['G'] >= 2 ? 'white' : 'black'} fontSize="20" fontWeight="bold" stroke="none">G</text>

            {/* Building E */}
            <path d="M 130,200 L 200,200 L 200,250 L 150,260 L 120,240 Z" fill={getFillColor('E')} />
            <text x="160" y="235" fill={unlocks['E'] >= 2 ? 'white' : 'black'} fontSize="20" fontWeight="bold" stroke="none">E</text>

            {/* Building D */}
            <rect x="200" y="160" width="80" height="80" fill={getFillColor('D')} />
            <text x="235" y="205" fill={unlocks['D'] >= 2 ? 'white' : 'black'} fontSize="20" fontWeight="bold" stroke="none">D</text>

            {/* Building C */}
            <rect x="280" y="190" width="40" height="40" fill={getFillColor('C')} />
            <text x="295" y="215" fill={unlocks['C'] >= 2 ? 'white' : 'black'} fontSize="20" fontWeight="bold" stroke="none">C</text>

            {/* Building B */}
            <rect x="320" y="150" width="60" height="130" fill={getFillColor('B')} />
            <text x="345" y="220" fill={unlocks['B'] >= 2 ? 'white' : 'black'} fontSize="20" fontWeight="bold" stroke="none">B</text>

            {/* Building A */}
            <path d="M 380,200 L 440,200 L 470,250 L 440,290 L 380,270 Z" fill={getFillColor('A')} />
            <text x="415" y="245" fill={unlocks['A'] >= 2 ? 'white' : 'black'} fontSize="20" fontWeight="bold" stroke="none">A</text>
          </g>
        </svg>

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {['A', 'B', 'C', 'D', 'E', 'G'].map(b => (
            <div key={b} style={{ textAlign: 'center', width: '80px' }}>
              <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>Bldg {b}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{unlocks[b] || 0} / 3</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <Link href="/" className="glass-button">
          Return Home
        </Link>
      </div>
    </div>
  );
}
