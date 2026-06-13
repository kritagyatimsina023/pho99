'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSound } from '@/provider/SoundProvider';
import { Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from './Button';
import Heading from './Heading';

const Preloader = () => {
  const { hasInteracted, setHasInteracted, play } = useSound();
  const [isVisible, setIsVisible] = useState(true);

  // Render preloader on every initial load
  useEffect(() => {
    if (hasInteracted && !isVisible) return;
  }, [hasInteracted, isVisible]);

  useGSAP(() => {
    if (!isVisible) return;

    const tl = gsap.timeline();

    tl
      .fromTo('.preloader-logo',
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'elastic.out(1, 0.7)' },

      ).fromTo('.preloader-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
        , "<+=0.5")
      .fromTo('.preloader-btn-1',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        "-=1.2"
      )
      .fromTo('.preloader-btn-2',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        "-=0.8"
      );
  }, [isVisible]);

  if (!isVisible) return null;

  const handleChoice = (withSound: boolean) => {
    if (withSound) {
      play();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setHasInteracted(true);
        setIsVisible(false);
        gsap.set('#main-wrapper', { clearProps: 'clipPath' });
      }
    });

    tl.to('.preloader-content', {
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: 'power2.inOut'
    })
      .set('.preloader-overlay', { display: 'none' })
      .fromTo('#main-wrapper',
        { clipPath: 'circle(0% at 50% 0%)' },
        {
          clipPath: 'circle(150% at 50% 0%)',
          duration: 2.5,
          ease: 'power2.inOut'
        }
      );
  };

  return (
    <div
      className="preloader-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-black"
    >
      <div className="absolute inset-0 bg-[url('/PhooRes/texture-bg.png')] opacity-10 bg-cover bg-center pointer-events-none" />

      <div className="preloader-content flex flex-col items-center justify-center gap-12 z-10 max-w-lg w-full px-6">
        {/* Logo Reveal */}
        <div className="flex flex-col items-center gap-5">
          <Image
            src="/PhooRes/Logo/PhooLogo.svg"
            alt="Pho99 Logo"
            width={180}
            height={180}
            className="preloader-logo drop-shadow-2xl opacity-0"
          />
          <Heading className="preloader-title font-loader  text-2xl!   text-black!">
            Vietnam in Every Bite
          </Heading>
        </div>
        {/* Options */}
        <div className="flex flex-col sm:flex-col gap-3 w-fit mx-auto">
          <Button
            onClick={() => handleChoice(true)}
            className="preloader-btn-2 text-white!"
          >
            <span className="font-medium tracking-wide text-white!">Experience With Sound</span>
          </Button>
          <Button
            white={false}
            onClick={() => handleChoice(false)}
            className="preloader-btn-1 bg-white! text-black! border-1 border-red-400! hover:bg-white! "
          >
            <span className="font-medium tracking-wide ">Experience with Silent </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
