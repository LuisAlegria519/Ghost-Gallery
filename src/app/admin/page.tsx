'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const DEFAULT_MOCK = [
  // WALL GALLERY (5 Panoramas)
  { id: 'w1', title: 'Cyberpunk Metropolis', artist_name: 'Neon Dreams', building: 'B', floor: 2, placement: 'wall', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&q=80' },
  { id: 'w2', title: 'Abstract Sketch', artist_name: 'J. Doe', building: 'B', floor: 2, placement: 'wall', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80' },
  { id: 'w3', title: 'Modern Portrait', artist_name: 'Sarah V.', building: 'B', floor: 2, placement: 'wall', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80' },
  { id: 'w4', title: 'Brutalism', artist_name: 'Arch Co.', building: 'B', floor: 2, placement: 'wall', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80' },
  { id: 'w5', title: 'Forest Pathway', artist_name: 'Nature Guild', building: 'B', floor: 2, placement: 'wall', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80' },

  // FLOOR INSTALLATIONS (3 Pieces)
  { id: 'f1', title: 'The Crew', artist_name: 'BHCC Photography Club', building: 'B', floor: 2, placement: 'floor', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1529156069898-49953eb1b5b6?w=600&q=80' },
  { id: 'f2', title: 'Street Chalk', artist_name: 'Banksy Jr', building: 'B', floor: 2, placement: 'floor', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80' },
  { id: 'f3', title: 'Fluid Canvas', artist_name: 'Flow State', building: 'B', floor: 2, placement: 'floor', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80' },

  // CEILING MURALS (3 Pieces)
  { id: 'c1', title: 'Deep Space', artist_name: 'NASA', building: 'B', floor: 2, placement: 'ceiling', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80' },
  { id: 'c2', title: 'Oil Canvas 04', artist_name: 'Maria V.', building: 'B', floor: 2, placement: 'ceiling', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80' },
  { id: 'c3', title: 'Geometric Ceiling', artist_name: 'RenderBot', building: 'B', floor: 2, placement: 'ceiling', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80' },

  // FLOATING HOLOGRAMS (3 Pieces)
  { id: 'h1', title: 'Neon Nights', artist_name: 'Synthwave', building: 'B', floor: 2, placement: 'floating', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&q=80' },
  { id: 'h2', title: 'Tesseract', artist_name: 'Dimension 4', building: 'B', floor: 2, placement: 'floating', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&q=80' },
  { id: 'h3', title: 'Glass Heart', artist_name: 'Fragile', building: 'B', floor: 2, placement: 'floating', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=600&q=80' },

  // DUPLICATE ENTIRE GALLERY FOR MASSIVE SCREEN-FILLING EFFECT
  { id: 'w1_d', title: 'Cyberpunk Metropolis 2', artist_name: 'Neon Dreams', building: 'B', floor: 2, placement: 'wall', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&q=80' },
  { id: 'w2_d', title: 'Abstract Sketch 2', artist_name: 'J. Doe', building: 'B', floor: 2, placement: 'wall', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80' },
  { id: 'w3_d', title: 'Modern Portrait 2', artist_name: 'Sarah V.', building: 'B', floor: 2, placement: 'wall', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80' },
  { id: 'w4_d', title: 'Brutalism 2', artist_name: 'Arch Co.', building: 'B', floor: 2, placement: 'wall', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80' },
  { id: 'w5_d', title: 'Forest Pathway 2', artist_name: 'Nature Guild', building: 'B', floor: 2, placement: 'wall', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80' },
  { id: 'f1_d', title: 'The Crew 2', artist_name: 'BHCC Photography Club', building: 'B', floor: 2, placement: 'floor', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1529156069898-49953eb1b5b6?w=600&q=80' },
  { id: 'f2_d', title: 'Street Chalk 2', artist_name: 'Banksy Jr', building: 'B', floor: 2, placement: 'floor', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80' },
  { id: 'f3_d', title: 'Fluid Canvas 2', artist_name: 'Flow State', building: 'B', floor: 2, placement: 'floor', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&q=80' },
  { id: 'c1_d', title: 'Deep Space 2', artist_name: 'NASA', building: 'B', floor: 2, placement: 'ceiling', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80' },
  { id: 'c2_d', title: 'Oil Canvas 04 2', artist_name: 'Maria V.', building: 'B', floor: 2, placement: 'ceiling', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80' },
  { id: 'c3_d', title: 'Geometric Ceiling 2', artist_name: 'RenderBot', building: 'B', floor: 2, placement: 'ceiling', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80' },
  { id: 'h1_d', title: 'Neon Nights 2', artist_name: 'Synthwave', building: 'B', floor: 2, placement: 'floating', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&q=80' },
  { id: 'h2_d', title: 'Tesseract 2', artist_name: 'Dimension 4', building: 'B', floor: 2, placement: 'floating', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&q=80' },
  { id: 'h3_d', title: 'Glass Heart 2', artist_name: 'Fragile', building: 'B', floor: 2, placement: 'floating', type: 'image', status: 'approved', url: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=600&q=80' },
  
  // POETRY / TEXT DEMONSTRATION
  { 
    id: 't1', 
    title: 'The silent walls speak,\\nWhispers of a painted soul,\\nColors breathe in air.', 
    artist_name: 'The Ghost', 
    building: 'B', 
    floor: 2, 
    placement: 'wall', 
    type: 'text', 
    status: 'approved', 
    url: '' 
  },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submissions, setSubmissions] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mock_submissions');
    if (saved) {
      setSubmissions(JSON.parse(saved));
    } else {
      setSubmissions(DEFAULT_MOCK);
      localStorage.setItem('mock_submissions', JSON.stringify(DEFAULT_MOCK));
    }
  }, []);

  const handleLogin = () => {
    // Simple mock auth - replace with Supabase auth in production
    if (password.trim().toLowerCase() === 'ghostadmin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. (Hint: ghostadmin)');
    }
  };

  const handleAction = (id: string, action: 'approved' | 'rejected' | 'deleted') => {
    let updated;
    if (action === 'deleted' || action === 'rejected') {
      updated = submissions.filter(s => s.id !== id);
    } else {
      updated = submissions.map(s => s.id === id ? { ...s, status: action } : s);
    }
    setSubmissions(updated);
    localStorage.setItem('mock_submissions', JSON.stringify(updated));
  };

  const loadDemoData = () => {
    setSubmissions(DEFAULT_MOCK);
    localStorage.setItem('mock_submissions', JSON.stringify(DEFAULT_MOCK));
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '32px', width: '100%', maxWidth: '400px' }}>
          <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '24px' }}>Admin Login</h2>
          {error && <div style={{ color: 'var(--accent-magenta)', textAlign: 'center', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Admin Password" 
              className="glass-input" 
            />
            <button onClick={() => handleLogin()} className="glass-button primary" style={{ width: '100%' }}>Login</button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Return Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 className="text-gradient">Moderation Dashboard</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="glass-button" style={{ backgroundColor: 'rgba(255, 0, 255, 0.1)' }} onClick={loadDemoData}>Load B2 Demo</button>
          <button className="glass-button" onClick={() => setIsAuthenticated(false)}>Logout</button>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No pending submissions to review.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {submissions.map((sub) => (
            <div key={sub.id} className="glass-panel" style={{ overflow: 'hidden' }}>
              <div style={{ height: '200px', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sub.url} alt={sub.title || 'Submission'} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>{sub.title || 'Untitled'}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 4px 0' }}>By: {sub.artist_name || 'Anonymous'}</p>
                <p style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', margin: '0 0 4px 0' }}>Building {sub.building} • Floor {sub.floor} • Type: {sub.type}</p>
                <p style={{ color: 'var(--accent-magenta)', fontSize: '0.8rem', margin: '0 0 16px 0', textTransform: 'uppercase' }}>
                  Placement: {sub.placement || 'wall'} • Status: {sub.status}
                </p>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  {sub.status === 'pending' ? (
                    <button 
                      onClick={() => handleAction(sub.id, 'approved')}
                      className="glass-button" 
                      style={{ flex: 1, backgroundColor: 'rgba(0, 255, 0, 0.1)', borderColor: 'rgba(0, 255, 0, 0.3)' }}
                    >
                      Approve
                    </button>
                  ) : (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0, 255, 0, 0.2)', borderRadius: '12px', color: 'rgba(0, 255, 0, 0.8)' }}>
                      Approved
                    </div>
                  )}
                  <button 
                    onClick={() => handleAction(sub.id, 'deleted')}
                    className="glass-button" 
                    style={{ flex: 1, backgroundColor: 'rgba(255, 0, 0, 0.1)', borderColor: 'rgba(255, 0, 0, 0.3)' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
