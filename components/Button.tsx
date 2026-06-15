import Image from "next/image";
import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  varient?: string;
  icon?: React.ReactNode;
  white?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, white = true, varient = "primary", icon, type = "button", ...props }, ref) => {
    return (
      <button type={type} ref={ref} className={`group ${className} bg-red-600! flex items-center text-white! px-4 py-2 md:px-5 md:py-3 lg:px-6 lg:py-3.5 rounded-full gap-2 text-sm md:text-base font-bold hover:bg-red-800! transition-all duration-300 cursor-pointer `} {...props}>
        {icon && icon}
        <div className="relative w-6 h-6 md:w-8 md:h-8 shrink-0 transition-transform duration-500">
          {white ? <Image fill src="/PhooRes/Building/white.png" alt="" /> : <Image fill src="/PhooRes/Building/lotusDesign.png" alt="" />}
        </div>
        <span className="transition-all duration-300 whitespace-nowrap text-white!">{children}</span>
        <div className="relative w-6 h-6 md:w-8 md:h-8 shrink-0 transition-transform duration-500">
          {white ? <Image fill src="/PhooRes/Building/white.png" alt="" /> : <Image fill src="/PhooRes/Building/lotusDesign.png" alt="" />}
        </div>
      </button>
    )
  }
)
Button.displayName = "Button";
export default Button;
