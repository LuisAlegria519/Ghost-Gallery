import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Prevent throwing errors immediately during build if keys are missing
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export type ArtworkStatus = 'pending' | 'approved' | 'rejected';

export type Artwork = {
  id: string;
  created_at: string;
  url: string; // URL to the media in Supabase Storage
  type: 'image' | 'text' | 'model'; // Type of media
  title: string | null;
  artist_name: string | null;
  instagram_handle: string | null;
  building: string;
  floor: number;
  placement: 'wall' | 'floor' | 'ceiling' | 'floating';
  status: ArtworkStatus;
};
