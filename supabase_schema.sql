-- Run this in your Supabase SQL Editor to set up the database for Ghost Gallery

-- Create the artworks table
CREATE TABLE artworks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'text', 'model')),
  title TEXT,
  artist_name TEXT,
  instagram_handle TEXT,
  building TEXT NOT NULL,
  floor INTEGER NOT NULL,
  placement TEXT DEFAULT 'wall' CHECK (placement IN ('wall', 'floor', 'ceiling', 'floating')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Enable Row Level Security (RLS)
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Allow public read access to ONLY approved artworks
CREATE POLICY "Public can view approved artworks" 
ON artworks FOR SELECT 
USING (status = 'approved');

-- Allow anyone to insert (submit) an artwork (since we have no user auth for submission)
CREATE POLICY "Anyone can submit artwork" 
ON artworks FOR INSERT 
WITH CHECK (true);

-- Create a storage bucket for artwork media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('ghost-gallery-media', 'ghost-gallery-media', true);

-- Allow public uploads to the bucket
CREATE POLICY "Public Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'ghost-gallery-media');

-- Allow public viewing of media in the bucket
CREATE POLICY "Public Read Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'ghost-gallery-media');
