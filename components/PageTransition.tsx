"use client";

import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

const MIN_HOLD_MS = 650;
const MAX_IMAGE_WAIT_MS = 4200;

function isModifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function getVisibleRouteImages() {
  const routeContent = document.getElementById("route-transition-content");
  if (!routeContent) return [];

  return Array.from(routeContent.querySelectorAll<HTMLImageElement>("img")).filter((image) => {
    if (image.dataset.transitionIgnore === "true") return false;
    const rect = image.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight + 240;
  });
}
async function waitForImageContent() {
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const images = getVisibleRouteImages();
  if (images.length === 0) return;
  const imagePromises = images.map((image) => {
    if (image.complete && image.naturalWidth > 0) return Promise.resolve();
    if (image.decode) {
      return image.decode().catch(() => undefined);
    }
    return new Promise<void>((resolve) => {
      image.addEventListener("load", () => resolve(), { once: true });
      image.addEventListener("error", () => resolve(), { once: true });
    });
  });

  await Promise.race([
    Promise.all(imagePromises),
    delay(MAX_IMAGE_WAIT_MS),
  ]);
}
const brandMessages = [
  "Crafting experiences",
  "Where tradition meets innovation",
  "Authentic flavors await",
  "Every detail matters",
  "Journey begins here"
];


export default function PageTransition({ children, debug = false }: PropsWithChildren<{ debug?: boolean }>) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const transitionStartedAt = useRef(0);
  const pendingHref = useRef<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [messageVisible, setMessageVisible] = useState(true);
  const [progress, setProgress] = useState(0);


  const showTransition = useCallback(async () => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const mark = markRef.current;
    const line = lineRef.current;
    if (!overlay || !logo || !mark || !line) return;

    setIsTransitioning(true);
    transitionStartedAt.current = performance.now();
    document.body.style.overflow = "hidden";

    gsap.killTweensOf([overlay, logo, mark, line]);
    gsap.set(overlay, { autoAlpha: 1, yPercent: 100 });
    gsap.set(logo, { autoAlpha: 0, y: 28, scale: 0.94 });
    gsap.set(mark, { rotate: -8, scale: 0.9 });
    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

    await gsap.timeline()
      .to(overlay, { yPercent: 0, duration: 0.72, ease: "power4.inOut" })
      .to(logo, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }, "-=0.22")
      .to(mark, { rotate: 0, scale: 1, duration: 0.55, ease: "back.out(1.7)" }, "-=0.42")
      .to(line, {
        scaleX: 1,
        duration: 0.85,
        ease: "power2.inOut",
        onUpdate: function () {
          setProgress(Math.round(this.progress() * 100));
        }
      }, "-=0.25");
  }, []);

  const hideTransition = useCallback(async () => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const line = lineRef.current;
    if (!overlay || !logo || !line) return;
    const elapsed = performance.now() - transitionStartedAt.current;
    if (elapsed < MIN_HOLD_MS) {
      await delay(MIN_HOLD_MS - elapsed);
    }

    gsap.killTweensOf([overlay, logo, line]);
    await gsap.timeline()
      .to(line, { scaleX: 0, transformOrigin: "right center", duration: 0.28, ease: "power2.in" })
      .to(logo, { autoAlpha: 0, y: -18, scale: 0.98, duration: 0.28, ease: "power2.in" }, "-=0.16")
      .to(overlay, { yPercent: -100, duration: 0.68, ease: "power4.inOut" }, "-=0.05");

    setProgress(0);

    gsap.set(overlay, { autoAlpha: 0, yPercent: 100 });
    document.body.style.overflow = "";
    setIsTransitioning(false);
    pendingHref.current = null;
  }, []);

  useEffect(() => {
    if (debug) {
      gsap.set(overlayRef.current, { autoAlpha: 1, yPercent: 0 });
      gsap.set(logoRef.current, { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(markRef.current, { rotate: 0, scale: 1 });
      gsap.set(lineRef.current, { scaleX: 1, transformOrigin: "left center" });
    } else {
      gsap.set(overlayRef.current, { autoAlpha: 0, yPercent: 100 });
    }
  }, [debug]);

  useEffect(() => {
    if (!isTransitioning && !debug) return;

    const cycle = setInterval(() => {

      setMessageVisible(false);

      setTimeout(() => {

        setMessageIndex(prev => (prev + 1) % brandMessages.length);

        setMessageVisible(true);
      }, 350);
    }, 800);

    return () => clearInterval(cycle);
  }, [isTransitioning, debug]);

  useEffect(() => {
    gsap.set(overlayRef.current, { autoAlpha: 0, yPercent: 100 });
  }, []);

  useEffect(() => {
    const handleClick = async (event: MouseEvent) => {
      if (isModifiedClick(event) || event.defaultPrevented || pendingHref.current) return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) return;

      const nextUrl = new URL(rawHref, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;
      if (nextUrl.pathname === window.location.pathname && nextUrl.search === window.location.search) return;

      event.preventDefault();
      pendingHref.current = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;

      await showTransition();
      router.push(pendingHref.current);
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router, showTransition]);

  useEffect(() => {
    if (!pendingHref.current || !isTransitioning) return;
    const targetPathname = new URL(pendingHref.current, window.location.href).pathname;
    if (targetPathname !== pathname) return;

    let cancelled = false;
    const finish = async () => {
      await waitForImageContent();
      if (!cancelled) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        await hideTransition();
      }
    };
    finish();
    return () => {
      cancelled = true;
    };
  }, [pathname, isTransitioning, hideTransition]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <>
      <div id="route-transition-content" aria-hidden={isTransitioning ? "true" : undefined}>
        {children}
      </div>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-red-600 pointer-events-none"
        aria-live="polite"
        aria-label="Loading page"
      >
        {/* <div className="absolute inset-x-0 top-0 h-1/2 bg-[#EC1C25]" /> */}
        {/* <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#151515]" /> */}
        <div ref={logoRef} className="relative z-10 flex flex-col items-center gap-7 px-8 text-center">
          <div ref={markRef} className="relative h-28 w-28 sm:h-36 sm:w-36">
            <Image
              src="/PhooRes/Logo/whiteLogo.svg"
              alt="Pho99"
              fill
              priority
              data-transition-ignore="true"
              className="object-contain drop-shadow-[0_18px_42px_rgba(0,0,0,0.35)]"
            />
          </div>
          {/* <p
            className="text-white! text-sm font-light tracking-[0.2em] uppercase"
            style={{
              opacity: messageVisible ? 1 : 0,
              transform: messageVisible ? "translateY(0px)" : "translateY(6px)",
              transition: "opacity 350ms ease, transform 350ms ease",
            }}
          >
            {brandMessages[messageIndex]}
          </p> */}
          <div className="space-y-3 flex flex-col items-center">

            <div className="h-[2px] rounded-full w-56 overflow-hidden bg-white/25 sm:w-72">
              <div ref={lineRef} className="h-full w-full bg-white" />
            </div>

            {/* <div className="text-white/60 text-xs font-mono tracking-widest">
              {progress}%
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
