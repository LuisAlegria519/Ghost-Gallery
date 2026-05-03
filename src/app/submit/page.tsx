'use client';

import { useState } from 'react';
import Link from 'next/link';
// import { supabase } from '@/lib/supabase'; // We will use this later when Supabase is configured

export default function SubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const artist = formData.get('artist_name') as string;
    const instagram = formData.get('instagram') as string;
    const building = formData.get('building');
    const floor = formData.get('floor');
    const placement = formData.get('placement') || 'wall';
    
    const file = formData.get('file') as File;
    
    // Convert file to a compressed base64 string so it fits in localStorage
    let fileUrl = 'https://via.placeholder.com/150?text=New+Art';
    
    if (file && file.size > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 800; // Compress down to 800px max
          
          if (width > height && width > maxDim) {
            height *= maxDim / width;
            width = maxDim;
          } else if (height > maxDim) {
            width *= maxDim / height;
            height = maxDim;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 70% quality to ensure it is incredibly small
          fileUrl = canvas.toDataURL('image/jpeg', 0.7);
          saveSubmission(fileUrl);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      saveSubmission(fileUrl);
    }

    function saveSubmission(finalUrl: string) {
      setTimeout(() => {
        const saved = localStorage.getItem('mock_submissions');
        const submissions = saved ? JSON.parse(saved) : [];
        submissions.push({
          id: Math.random().toString(36).substr(2, 9),
          title: 'New Submission',
          artist_name: artist,
          instagram: instagram,
          building: building as string,
          floor: parseInt(floor as string, 10),
          placement: placement as string,
          type: 'image',
          status: 'pending',
          url: finalUrl
        });
        localStorage.setItem('mock_submissions', JSON.stringify(submissions));

        setIsSubmitting(false);
        setSuccess(true);
      }, 1000);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px 24px', width: '100%', maxWidth: '400px' }}>
          <h2 className="text-gradient" style={{ marginBottom: '16px' }}>Submission Received!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Your artwork has been sent to our moderators for review. Once approved, it will manifest in the Ghost Gallery!
          </p>
          <Link href="/" className="glass-button primary">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="glass-panel" style={{ padding: '32px 24px', width: '100%', maxWidth: '500px' }}>
        <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '8px', textAlign: 'center' }}>Submit Art</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'center', fontSize: '0.9rem' }}>
          Leave your mark on Bunker Hill. Submissions are screened before appearing.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Artwork / Media</label>
          <input type="file" name="file" required className="glass-input" accept="image/*, .txt, .pdf" />

          <label style={{ marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Artist Name (Optional)</label>
          <input type="text" name="artist_name" placeholder="Anonymous" className="glass-input" />

          <label style={{ marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Instagram Handle (Optional)</label>
          <input type="text" name="instagram" placeholder="@yourhandle" className="glass-input" />

          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'block' }}>Building</label>
              <select name="building" defaultValue="" required className="glass-input" style={{ width: '100%', appearance: 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <option value="" disabled>Select</option>
                <option value="A">Building A</option>
                <option value="B">Building B</option>
                <option value="C">Building C</option>
                <option value="D">Building D</option>
                <option value="E">Building E</option>
                <option value="G">Building G</option>
              </select>
            </div>
            
            <div style={{ flex: 1 }}>
              <label style={{ marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'block' }}>Floor</label>
              <select name="floor" defaultValue="" required className="glass-input" style={{ width: '100%', appearance: 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <option value="" disabled>Select</option>
                <option value="1">Floor 1</option>
                <option value="2">Floor 2</option>
                <option value="3">Floor 3</option>
                <option value="4">Floor 4</option>
                <option value="5">Floor 5</option>
              </select>
            </div>
          </div>

          <label style={{ marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Placement (Where should it go?)</label>
          <select name="placement" required className="glass-input" style={{ appearance: 'none', backgroundColor: 'rgba(0,0,0,0.5)', marginBottom: '16px' }}>
            <option value="wall">Wall</option>
            <option value="floor">Floor</option>
            <option value="ceiling">Ceiling</option>
            <option value="floating">Floating (Mid-air)</option>
          </select>

          <button type="submit" disabled={isSubmitting} className="glass-button primary" style={{ marginTop: '16px' }}>
            {isSubmitting ? 'Uploading...' : 'Submit to Gallery'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
