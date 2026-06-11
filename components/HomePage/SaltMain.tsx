// "use client";

// import React, { useRef, useCallback } from "react";
// import Heading from "../Heading";
// // import Button from "../Button";
// import Image from "next/image";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import Button from "../Button";

// gsap.registerPlugin(ScrollTrigger);

// const saltCrystals = [
//   {
//     top: "5%",
//     left: "2%",
//     width: 100,
//     rotate: -15,
//     source: "/PhooRes/triangle.png",
//     crystalSrc: "/PhooRes/triangle.svg",
//   },
//   {
//     top: "4%",
//     left: "30%",
//     width: 110,
//     rotate: 8,
//     source: "/PhooRes/triangle.png",
//     crystalSrc: "/Slider/CrystalTwo.svg",
//   },
//   {
//     top: "20%",
//     right: "15%",
//     width: 150,
//     rotate: 0,
//     source: "/About/Salt/salt_cold_5.webp",
//     crystalSrc: "/Slider/CrystalThree.svg",
//   },
//   {
//     top: "40%",
//     left: "12%",
//     width: 410,
//     rotate: -8,
//     source: "/About/Salt/salt_cold_4.webp",
//     crystalSrc: "/Slider/CrystalFour.svg",
//   },
//   {
//     top: "55%",
//     left: "58%",
//     width: 88,
//     rotate: -15,
//     source: "/About/Salt/salt_cold_6.webp",
//     crystalSrc: "/Slider/CrystalFive.svg",
//   },
//   {
//     top: "4%",
//     right: "4%",
//     width: 80,
//     rotate: 15,
//     source: "/About/Salt/salt_cold_7.webp",
//     crystalSrc: "/Slider/CrystalSix.svg",
//   },
//   {
//     bottom: "2%",
//     right: "6%",
//     width: 220,
//     rotate: 10,
//     source: "/About/Salt/salt_cold_3.webp",
//     crystalSrc: "/Slider/CystalSix.svg",
//   },
// ];

// const SVGImage = [
//   {
//     id: 1,
//     source: "/About/Salt/S.svg",

//     title: "Stories",
//     desc: "stories of the silk road, salt caravans and fishing villages",
//   },
//   {
//     id: 2,
//     source: "/About/Salt/A.svg",

//     title: "Art",
//     desc: "serving on salt slabs, decor made of crystals from the Himalayas and the Dead Sea",
//   },
//   {
//     id: 3,
//     source: "/About/Salt/L.svg",
//     width: "10vw",
//     height: "9vw",
//     title: "Legacy",
//     desc: `recipes preserved as salt -  Georgian adzhika, Egyptian dukka,  Provencal herbs
// Taste
// playing with salty accents: marinated olives, ferme`,
//   },
//   {
//     id: 4,
//     source: "/About/Salt/T.svg",

//     title: "Taste",
//     desc: "playing with salty accents: marinated olives, fermented cheeses, sea salt caramel",
//   },
// ];

// // const Courses = [
// //   {
// //     id: 1,
// //     // headingOne: "Course I",
// //     title: "Lazimpat",
// //     // desc: `Tuna with pomegranate and Egyptian dukkah Mediterranean tuna marinated in lemon juice, garnished with pomegranate grains and Gorgian tkemali sauce`,  
// //     desc: `Authentic Vietnamese cuisine crafted from cherished family recipes, creating a welcoming dining experience in the heart of Lazimpat.`,
// //     // footerPart: `Lightness - Birth of a Dialouge`,
// //     src: "/PhooRes/Building/heroBuildingOne.jpg",
// //   },
// //   {
// //     id: 2,
// //     // headingOne: "Course II",
// //     title: "Boudha",
// //     // desc: `Charred octopus with black garlic and saffron cream Tender octopus slowly grilled over open flame, paired with silky saffron cream and finished with aromatic black garlic essence`,
// //     desc: `A cherished Vietnamese restaurant known for authentic pho, traditional family recipes, and a welcoming dining experience.`,
// //     // footerPart: "Mystery - Fiery Palette",
// //     src: "/PhooRes/Building/Bouddha.jpg",
// //   },
// //   {
// //     id: 3,
// //     // headingOne: "Course III",
// //     title: "Jhamsikhel",
// //     // desc: `Seared sea bass with citrus herbs and coastal greens Fresh sea bass pan-seared to perfection, accompanied by fragrant herbs, vibrant greens and a delicate citrus glaze`, 
// //     desc: `Nestled in Jhamsikhel, this welcoming space combines authentic Vietnamese flavors with a relaxing garden and indoor dining experience.`,
// //     // footerPart: "Energy - synthesis of Elements",
// //     src: "/PhooRes/Building/Jhamsikhel.jpg",
// //   },
// //   {
// //     id: 4,
// //     // headingOne: "Course IV",
// //     title: "Thamel",
// //     // desc: `Red mullet with Georgian spices and Mediterranean olives Delicate red mullet infused with traditional spices, served alongside marinated olives and rich regional flavours`,
// //     desc: `A warm Vietnamese dining destination in Thamel, offering traditional flavors, exceptional hospitality, and a memorable experience.`,
// //     // footerPart: "Unity - Earth and sea",
// //     src: "/PhooRes/Building/Thamel.jpeg",
// //   },
// //   // {
// //   //   id: 5,
// //   //   headingOne: "Course V",
// //   //   title: "Sunset over the ocean",
// //   //   desc: `Salted caramel mousse with figs and orange blossom Silky caramel mousse layered with sweet figs, accented by orange blossom aromas and a touch of sea salt`,
// //   //   footerPart: "Finale - of a symphony",
// //   //   src: "/Slider/Course-5.webp",
// //   // },
// // ];

// const Courses = [
//   {
//     id: 1,
//     title: "Lazimpat",
//     desc: `Located in the heart of Lazimpat, Pho99 introduced Kathmandu to authentic Vietnamese cuisine through cherished family recipes. Known for its comforting bowls of pho and warm hospitality, it has become a favorite destination for locals, expatriates, and visitors alike.`,
//     src: "/PhooRes/Building/heroBuildingOne.jpg",
//   },
//   {
//     id: 2,
//     title: "Boudha",
//     desc: `Situated near the iconic Boudhanath Stupa, Pho99 Boudha offers a welcoming dining experience inspired by the rich flavors of Vietnam. Surrounded by the area's vibrant cultural atmosphere, it attracts both travelers and locals seeking authentic cuisine.`,
//     src: "/PhooRes/Building/Bouddha.jpg",
//   },
//   {
//     id: 3,
//     title: "Jhamsikhel",
//     desc: `Located in the vibrant neighborhood of Jhamsikhel, this charming outlet features cozy indoor seating and a beautiful courtyard garden. Its warm ambiance and authentic Vietnamese dishes make it an ideal setting for gatherings, casual meals, and special occasions.`,
//     src: "/PhooRes/Building/Jhamsikhel.jpg",
//   },
//   {
//     id: 4,
//     title: "Thamel",
//     desc: `Set in Kathmandu's bustling tourist district, Pho99 Thamel provides a welcoming retreat amidst the energy of the city. Surrounded by shops, cafés, and cultural attractions, it offers guests authentic Vietnamese flavors in a lively and memorable atmosphere.`,
//     src: "/PhooRes/Building/Thamel.jpeg",
//   },
// ];


// const SaltMain = () => {
//   const courseTrackRef = useRef<HTMLDivElement>(null);
//   const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const crystalRef = useRef<HTMLImageElement[] | null>([]);
//   const crystalWrapper = useRef<HTMLDivElement | null>(null);
//   const saltInfoRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const contentWrapper = useRef<HTMLDivElement | null>(null);
//   const crystalBgRef = useRef<HTMLDivElement | null>(null);
//   const courseWrapperRef = useRef<HTMLDivElement | null>(null);
//   const svgCrystalRef = useRef<(HTMLDivElement | null)[]>([]);

//   const setTitleRef = useCallback(
//     (el: HTMLHeadingElement | null, index: number) => {
//       titleRefs.current[index] = el;
//     },
//     [],
//   );

//   useGSAP(() => {
//     const track = courseTrackRef.current;
//     if (!track || !crystalRef.current || !svgCrystalRef.current) return;

//     const getScrollAmount = () => {
//       return -(track.scrollWidth - window.innerWidth);
//     };

//     // Single master timeline for the entire section
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top top",
//         end: () => `+=${track.scrollWidth}`,
//         pin: true,
//         scrub: 1,
//         pinSpacing: true,
//         // markers: true,
//         invalidateOnRefresh: true,
//       },
//     });

//     tl.fromTo(
//       crystalWrapper.current,
//       { scale: 0 },
//       { scale: 1, ease: "power2.out" },
//     ).to(contentWrapper.current, { opacity: 0 }, "<+=0.1");

//     saltInfoRefs.current.forEach((infoEl, i) => {
//       if (!infoEl) return;
//       tl.fromTo(
//         infoEl,
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, ease: "power2.out" },
//       );
//       if (i < saltInfoRefs.current.length - 1) {
//         tl.to(infoEl, {
//           opacity: 0,
//           y: -20,
//           ease: "power2.in",
//         });
//       }
//     });

//     tl.to(crystalBgRef.current, { x: "-100vw", ease: "none" }, "transition")
//       .to(crystalWrapper.current, { x: "-100vw", ease: "none" }, "transition")
//       .fromTo(
//         courseWrapperRef.current,
//         { x: "100vw", opacity: 1 },
//         { x: "0vw", opacity: 1, ease: "none" },
//         "transition",
//       );

//     tl.to(track, {
//       x: getScrollAmount,
//       ease: "none",
//       duration: 4,
//     });

//     const titleTweens: gsap.core.Tween[] = [];
//     titleRefs.current.forEach((titleEl) => {
//       if (!titleEl) return;
//       const t = gsap.fromTo(
//         titleEl,
//         { opacity: 0.1 },
//         {
//           opacity: 0.1,
//           keyframes: [
//             { opacity: 0.1, percent: 0 },
//             { opacity: 0.9, percent: 50 },
//             { opacity: 0.1, percent: 100 },
//           ],
//           scrollTrigger: {
//             trigger: titleEl,
//             containerAnimation: tl,
//             start: "left 80%",
//             end: "right 20%",
//             scrub: true,
//           },
//         },
//       );
//       titleTweens.push(t);
//     });

//     // Crystal parallax (independent ScrollTrigger)
//     crystalRef.current.forEach((el, i) => {
//       if (!el) return;
//       const direction = i % 2 === 0 ? -1 : 1;
//       const speed = 20 + (i % 3) * 15;
//       gsap.fromTo(
//         el,
//         { yPercent: speed * direction * -1 },
//         {
//           yPercent: speed * direction,
//           ease: "none",
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top bottom",
//             // end: "bottom top",
//             end: `+=${track.scrollWidth}`,
//             scrub: 1.5,
//           },
//         },
//       );
//     });
//     svgCrystalRef.current.forEach((el, i) => {
//       if (!el) return;
//       const direction = i % 2 === 0 ? -1 : 1;
//       const speed = 20 + (i % 3) * 25;
//       gsap.fromTo(
//         el,
//         { yPercent: speed * direction * -1 },
//         {
//           yPercent: speed * direction,
//           ease: "none",
//           scrollTrigger: {
//             trigger: el,
//             start: "top bottom",
//             // end: "bottom top",
//             end: `+=${track.scrollWidth}`,
//             scrub: 1.5,
//           },
//         },
//       );
//     });
//     return () => {
//       titleTweens.forEach((t) => {
//         t.scrollTrigger?.kill();
//         t.kill();
//       });
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative bg-black min-h-dvh w-full overflow-hidden"
//     >
//       {/* Salt crystals background */}
//       <div ref={crystalBgRef} className="absolute inset-0 w-full h-full">
//         {saltCrystals.map((s, i) => (
//           <Image
//             key={i}
//             src={s.source}
//             ref={(el) => {
//               crystalRef.current![i] = el;
//             }}
//             width={s.width}
//             height={s.width}
//             alt=""
//             aria-hidden="true"
//             className="absolute z-10 pointer-events-none select-none opacity-90"
//             style={{
//               top: s.top,
//               bottom: s.bottom,
//               left: s.left,
//               right: s.right,
//               width: s.width,
//               transform: `rotate(${s.rotate}deg)`,
//             }}
//           />
//         ))}
//       </div>
//       {/* Salt SVG + Content layer */}
//       {/* Salt SVG letters */}
//       <div className="flex relative h-dvh z-20 flex-col items-center py-32">
//         {/* <div
//           ref={crystalWrapper}
//           className="absolute inset-0 z-40 flex
//             px-4 md:px-10 pointer-events-none
//             select-none"
//         >
//           {SVGImage.map((image, index) => (
//             <div
//               key={image.id}
//               className="relative flex-1 flex flex-col items-center mt-20"
//             >
//               <div className="relative  w-[22vw] h-[60vh] flex items-center justify-center">
//                 {image.id === 3 ? (
//                   <Image
//                     src={image.source}
//                     alt=""
//                     width={0}
//                     height={0}
//                     sizes="11vw"
//                     className="object-contain"
//                     style={{ width: "20vw", height: "26vw" }}
//                     priority
//                   />
//                 ) : (
//                   <Image
//                     src={image.source}
//                     alt=""
//                     fill
//                     className="object-contain"
//                     priority
//                   />
//                 )}
//               </div>
//               <div
//                 ref={(el) => {
//                   saltInfoRefs.current[index] = el;
//                 }}
//                 className="px-2 text-left w-[18vw]"
//                 style={{ opacity: 0 }}
//               >
//                 <h3 className="text-2xl md:text-7xl! font-serif text-about-bg! uppercase tracking-wide">
//                   {image.title}
//                 </h3>
//                 <p className="mt-2 text-md text-about-bg! leading-snug">
//                   {image.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div> */}

//         {/* Major content */}
//         <div ref={contentWrapper} className="flex flex-col items-center">
//           <h2>Join Us Here</h2>
//           <Heading className="text-center text-6xl! heading-secondary">
//             Experience Vietnam in Nepal
//           </Heading>
//           <p className="max-w-md pl-5 text-xl mx-auto mt-4 text-para-secondary">
//             Step into Pho99 and enjoy a warm, inviting atmosphere inspired by Vietnamese
//             hospitality. Whether you're joining us for a quick lunch, a family gathering,
//             or an evening meal, every visit is an opportunity to experience authentic
//             Vietnamese flavors and genuine hospitality.
//           </p>
//           {/* <div className="mt-8">
//             <Button className="">Reservation</Button>
//           </div> */}
//         </div>
//       </div>

//       {/* Courses – horizontal scroll (overlaid, starts hidden) */}
//       <div
//         ref={courseWrapperRef}
//         className="absolute inset-0 z-30 w-full h-dvh"
//         style={{ opacity: 0 }}
//       >
//         {/* Course crystal decorations */}
//         <div className="absolute inset-0 z-0 w-full h-full">
//           {saltCrystals.map((s, i) => (
//             <Image
//               ref={(el) => {
//                 svgCrystalRef.current[i] = el;
//               }}
//               key={i}
//               src={s.crystalSrc}
//               width={120}
//               height={120}
//               alt=""
//               aria-hidden="true"
//               className="absolute pointer-events-none select-none opacity-20"
//               style={{
//                 top: s.top,
//                 bottom: s.bottom,
//                 left: s.left,
//                 right: s.right,
//                 transform: `rotate(${s.rotate}deg)`,
//               }}
//             />
//           ))}
//         </div>
//         <div
//           ref={courseTrackRef}
//           className="flex items-center h-full relative z-10 flex-nowrap"
//           style={{ willChange: "transform" }}
//         >
//           {Courses.map((images, idx) => (
//             <div className="" key={idx}>
//               <Image alt="images" src={images.src} fill className="object-cover" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SaltMain;
