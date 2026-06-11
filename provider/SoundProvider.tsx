'use client';
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface SoundContextType {
  isPlaying: boolean;
  hasInteracted: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setHasInteracted: (val: boolean) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element on client side
    const audio = new Audio('/PhooRes/audio.mp3');
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio playback failed:', e));
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <SoundContext.Provider value={{ isPlaying, hasInteracted, play, pause, toggle, setHasInteracted }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
