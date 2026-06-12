import Image from "next/image";
import React, { forwardRef } from "react";

interface ButtonsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    spanClassName?: string
}

const Buttons = forwardRef<HTMLButtonElement, ButtonsProps>(
    ({ children, className = "", type = "button", ...props }, ref) => {
        return (
            <button
                ref={ref}
                type={type}
                className={`relative group cursor-pointer ${className}`}
                {...props}
            >
                {/* ── Bottom shadow / depth layer ─────────────────────────────────── */}
                <span
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-[4px] translate-y-[4px] rounded-sm "
                />

                {/* ── Main button face ────────────────────────────────────────────── */}
                <span
                    className={` ${className}
            relative z-[1]
            flex items-center gap-3
            px-2 py-3
            border-2 border-[#8B1A1A] rounded-sm
            text-[#8B1A1A] bg-white!
            text-[0.72rem] font-semibold uppercase tracking-[0.2em]
            transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(139,26,26,0.15)] group-hover:bg-[#fcf8f2]
          `}
                >
                    {/* Corner bracket — top-left */}
                    <span
                        aria-hidden="true"
                        className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-[#8B1A1A] pointer-events-none transition-all duration-300 group-hover:-top-1.5 group-hover:-left-1.5"
                    />
                    {/* Corner bracket — top-right */}
                    <span
                        aria-hidden="true"
                        className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-[#8B1A1A] pointer-events-none transition-all duration-300 group-hover:-top-1.5 group-hover:-right-1.5"
                    />
                    {/* Corner bracket — bottom-left */}
                    <span
                        aria-hidden="true"
                        className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-[#8B1A1A] pointer-events-none transition-all duration-300 group-hover:-bottom-1.5 group-hover:-left-1.5"
                    />
                    {/* Corner bracket — bottom-right */}
                    <span
                        aria-hidden="true"
                        className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-[#8B1A1A] pointer-events-none transition-all duration-300 group-hover:-bottom-1.5 group-hover:-right-1.5"
                    />

                    {/* Left lotus */}
                    <div className="relative w-8 h-8 flex-shrink-0 transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110">
                        <Image fill src="/PhooRes/Building/lotusDesign.png" alt="" />
                    </div>

                    {/* Label */}
                    <span className="uppercase tracking-widest transition-all duration-300 group-hover:tracking-[0.3em]">{children}</span>

                    {/* Right lotus */}
                    <div className="relative w-8 h-8 flex-shrink-0 transition-transform duration-500 group-hover:-rotate-180 group-hover:scale-110">
                        <Image fill src="/PhooRes/Building/lotusDesign.png" alt="" />
                    </div>
                </span>
            </button>
        );
    }
);

Buttons.displayName = "Buttons";
export default Buttons;