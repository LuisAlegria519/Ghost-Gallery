'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const DEFAULT_MOCK = [
  { id: '1', title: 'Midnight Campus', artist_name: 'Alex D.', building: 'B', floor: 2, placement: 'wall', type: 'image', status: 'pending', url: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Poem of the Halls', artist_name: 'Anonymous', building: 'C', floor: 1, placement: 'ceiling', type: 'text', status: 'pending', url: 'https://via.placeholder.com/150?text=Poem' },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<any[]>([]);

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
    } else {
      alert('Incorrect password');
    }
  };

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    const updated = submissions.filter(s => s.id !== id);
    setSubmissions(updated);
    localStorage.setItem('mock_submissions', JSON.stringify(updated));
    // In production: await supabase.from('artworks').update({ status: action }).eq('id', id);
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '32px', width: '100%', maxWidth: '400px' }}>
          <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '24px' }}>Admin Login</h2>
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
        <button className="glass-button" onClick={() => setIsAuthenticated(false)}>Logout</button>
      </div>

      {submissions.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No pending submissions to review.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {submissions.map((sub) => (
            <div key={sub.id} className="glass-panel" style={{ overflow: 'hidden' }}>
              <div style={{ height: '200px', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={sub.url} alt={sub.title || 'Submission'} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0' }}>{sub.title || 'Untitled'}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 4px 0' }}>By: {sub.artist_name || 'Anonymous'}</p>
                <p style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', margin: '0 0 4px 0' }}>Building {sub.building} • Floor {sub.floor} • Type: {sub.type}</p>
                <p style={{ color: 'var(--accent-magenta)', fontSize: '0.8rem', margin: '0 0 16px 0', textTransform: 'uppercase' }}>Placement: {sub.placement || 'wall'}</p>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleAction(sub.id, 'approved')}
                    className="glass-button" 
                    style={{ flex: 1, backgroundColor: 'rgba(0, 255, 0, 0.1)', borderColor: 'rgba(0, 255, 0, 0.3)' }}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleAction(sub.id, 'rejected')}
                    className="glass-button" 
                    style={{ flex: 1, backgroundColor: 'rgba(255, 0, 0, 0.1)', borderColor: 'rgba(255, 0, 0, 0.3)' }}
                  >
                    Reject
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
