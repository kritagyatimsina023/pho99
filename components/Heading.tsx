import React, { forwardRef } from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, className, style }, ref) => {
    return (
      <h1
        ref={ref}
        className={`font-semibold capitalize text-5xl md:text-6xl lg:text-8xl px-4 lg:px-0 leading-[1.2] ${className}`}
        style={style}
      >
        {children}
      </h1>
    );
  }
);

Heading.displayName = "Heading";
export default Heading;

// import React, { forwardRef, useRef } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// interface HeadingProps {
//   children: React.ReactNode;
//   className?: string;
//   style?: React.CSSProperties;
//   /** When true, the heading fades in then out as it scrolls through the viewport */
//   animated?: boolean;
// }

// const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
//   ({ children, className, style, animated = false }, externalRef) => {
//     const internalRef = useRef<HTMLHeadingElement>(null);

//     // Resolve which ref to actually attach to the element.
//     // If the parent passed a ref, honour it; otherwise use our internal one.
//     const resolvedRef =
//       externalRef && typeof externalRef !== "function"
//         ? externalRef
//         : internalRef;

//     // Wrapper ref used as the ScrollTrigger trigger element (one level up so
//     // the heading has some vertical height to scroll through).
//     const wrapperRef = useRef<HTMLDivElement>(null);

//     useGSAP(() => {
//       if (!animated) return;
//       if (!resolvedRef.current || !wrapperRef.current) return;

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: wrapperRef.current,
//           start: "top 85%",
//           end: "bottom 15%",
//           scrub: true,
//         },
//       });

//       tl.fromTo(
//         resolvedRef.current,
//         { opacity: 0.35 },
//         { opacity: 1, ease: "power1.inOut", duration: 1 }
//       ).to(resolvedRef.current, {
//         opacity: 0.35,
//         ease: "power1.inOut",
//         duration: 1,
//       });
//     }, [animated]);

//     const heading = (
//       <h1
//         ref={resolvedRef}
//         className={`font-semibold capitalize text-5xl md:text-6xl lg:text-8xl px-4 lg:px-0 leading-[1.2] ${className ?? ""}`}
//         style={style}
//       >
//         {children}
//       </h1>
//     );

//     // When animated, wrap in a div so ScrollTrigger has a stable trigger node
//     // that isn't the same element being tweened (avoids edge-case GSAP quirks).
//     if (animated) {
//       return <div ref={wrapperRef}>{heading}</div>;
//     }

//     return heading;
//   }
// );

// Heading.displayName = "Heading";
// export default Heading;