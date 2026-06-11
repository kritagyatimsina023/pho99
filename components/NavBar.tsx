'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import Heading from './Heading';
import { usePathname } from 'next/navigation';
const navLinks = [
  { href: '/', label: 'HOME', },
  { href: '/about', label: 'ABOUT' },
  { href: '/menu', label: 'MENU' },
  { href: '/contact', label: 'CONTACT US' },
  { href: '/news', label: 'NEWS' },

];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPastHero, setIsPastHero] = useState(false);


  const pathName = usePathname()

  const handleActive = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      const pinSpacer = document.querySelector('.pin-spacer');
      if (pinSpacer) {
        const rect = pinSpacer.getBoundingClientRect();
        if (rect.bottom <= 100) {
          setIsPastHero(true);
        } else {
          setIsPastHero(false);
        }
      } else {
        if (currentScrollY > window.innerHeight * 3) {
          setIsPastHero(true);
        } else {
          setIsPastHero(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-[60] flex items-center  justify-between px-6 md:px-10 py-2 pointer-events-none transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${!isPastHero ? 'bg-transparent' : ' bg-transparent shadow-sm backdrop-blur-md '}`}
      >
        {/* Left Side: Logo */}
        <div className="flex-1 flex items-center pointer-events-auto">
          <Link href="/">
            <Image width={70} height={70} alt='logo' src={'/PhooRes/Logo/PhooLogo.svg'} />
          </Link>
        </div>
        {/* Center: Equalizer Icon */}
        <div className="flex-1 hidden md:flex justify-center pointer-events-auto">
          <div className="flex items-end gap-[3px] h-5">
            <div className="w-[3px] bg-black/80 h-3"></div>
            <div className="w-[3px] bg-black/80 h-5"></div>
            <div className="w-[3px] bg-black/80 h-4"></div>
          </div>
        </div>
        {/* Right Side: Menu Button */}
        <div className="flex-1 flex items-center justify-end gap-4 pointer-events-auto ">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center bg-transparent! cursor-pointer gap-4 group hover:opacity-80 transition-opacity bg-none"
          >
            {/* <span className="hidden sm:block text-red-600! font-medium tracking-widest text-sm">MENU</span> */}
            <div className="w-12 h-12 rounded-full  flex flex-col items-center  justify-center gap-[5px]">
              <span className="w-5 h-[2px] bg-white! block transition-transform group-hover:-translate-y-[1px]"></span>
              <span className="w-5 h-[2px] bg-white! block transition-transform group-hover:translate-y-[1px]"></span>
            </div>
          </button>
        </div>
      </nav>
      {/* Full Screen Overlay Menu */}
      <div
        className={`fixed inset-0 z-[70] bg-primary transform transition-transform duration-700 ease-in-out flex flex-col lg:flex-row ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* Overlay Top Bar (Matches spacing of navbar) */}
        <div className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-10 py-6 z-[80]">
          {/* Logo in overlay */}
          <div className="flex-1 flex items-center">
            <Link href="/">
              <Image width={100} height={100} alt='logo' src={'/PhooRes/Logo/whiteLogo.svg'} />
            </Link>
          </div>
          {/* Equalizer inside overlay */}
          <div className="flex-1 hidden md:flex justify-center">
            <div className="flex items-end gap-[3px] h-5">
              <div className="w-[3px] bg-white! h-3"></div>
              <div className="w-[3px] bg-white! h-5"></div>
              <div className="w-[3px] bg-white! h-4"></div>
            </div>
          </div>
          {/* Close button */}
          <div className="flex-1 flex items-center  justify-end gap-4">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center bg-transparent!  -translate-y-3 gap-4 group cursor-pointer hover:opacity-80 transition-opacity "
            >
              <span className="hidden sm:block text-white! font-medium tracking-widest text-sm">CLOSE</span>
              <div className="w-12 h-12 bg-about-bg! rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-90">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </button>
          </div>
        </div>
        {/* Left section: Links */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center px-10 lg:px-20 pt-24 pb-10 relative z-10">
          <div className="flex flex-col gap-2">
            {navLinks.map(({ href, label }) => {
              const isActive = pathName == href
              return (
                <Link
                  style={{
                    fontFamily: "newMelfira"
                  }}
                  key={href}
                  href={href}
                  onClick={handleActive}
                  className={`text-5xl md:text-7xl lg:text-[5rem] font-bold leading-none tracking-tight ${isActive
                    ? 'text-[#fbd405]! flex items-center gap-4'
                    : 'text-white! hover:translate-x-10 transition-all duration-300 ease-in-out'
                    }`}
                >
                  {isActive && <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white flex-shrink-0"></span>}
                  {label}
                </Link>
              )

            })}
          </div>
        </div>
        {/* Right section: Location Selector */}
        <div className="hidden lg:flex lg:w-1/2 h-full relative items-center justify-center">
          <div className="w-[45%] h-[65%] bg-transparent! rounded-[24px] flex flex-col items-center justify-center gap-3 overflow-hidden relative">
            {/* <div className="absolute top-1 right-3"> */}
            <Heading className="text-white! bg-transparent! px-4 py-1.5 rounded-md font-bold hover:bg-red-700 transition-colors tracking-widest uppercase text-4xl! cursor-pointer z-10 text-center">
              Order From foodmandu
            </Heading>
            {/* </div> */}
            {/* Location List */}
            <div className="w-full px-3 py-2 flex flex-col gap-3">
              {['Lazimpat', 'Boudha', 'Jhamsikhel', 'Thamel'].map(location => (
                <div key={location} className="flex hover:bg-red-700/20 group items-center justify-between overflow-hidden gap-3 p-3 border border-red-400 rounded-xl transition-all cursor-pointer group bg-white/10">
                  {/* Logo Circle */}
                  <div className='flex items-center gap-1'>
                    <div className="w-7 h-7 bg-[#fbd405] rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {/* Stylized Logo Icon similar to the reference */}
                      <Image alt='food-mandu' width={20} height={20} className='rounded-full' src={"/PhooRes/Logo/foodmandu.png"} />
                    </div>
                    <span className="text-base font-serif text-white!">{location}</span>
                  </div>
                  {/* Location Text */}
                  {/* <MapPin /> */}
                  <span className='text-white! translate-x-40 group-hover:translate-x-0 text-sm! transition-all duration-300 ease-in-out' >Order Now</span>
                </div>
              ))}
            </div>
            {/* Replace the existing contact div with this */}
            <div className=" w-full flex px-4">
              {/* Divider */}
              <div className="flex items-start gap-4  w-full flex-col justify-between">
                {/* Email */}
                <div className="flex items-center gap-2.5 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/10 transition-all duration-200">
                    <Mail className="text-white! group-hover:text-white transition-colors" size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white! text-[10px] uppercase tracking-widest leading-none mb-0.5">Email</span>
                    <span className="text-white! text-xs group-hover:text-white transition-colors">pho99nepal@gmail.com</span>
                  </div>
                </div>
                {/* Vertical separator */}
                {/* Phone */}
                <div className="flex items-center gap-2.5 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/10 transition-all duration-200">
                    <Phone className="text-white! group-hover:text-white transition-colors" size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white! text-[10px] uppercase tracking-widest leading-none mb-0.5">Call Us</span>
                    <span className="text-white! text-xs group-hover:text-white transition-colors">+977-981 831 6955</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
