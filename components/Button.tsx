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
      <button type={type} ref={ref} className={`group ${className} bg-red-600! flex items-center text-white! px-5 py-3 rounded-full gap-2 text-md font-bold hover:bg-red-700! transition-all duration-300 cursor-pointer `} {...props}>
        {icon && icon}
        <div className="relative w-8 h-8 shrink-0 transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110">
          {white ? <Image fill src="/PhooRes/Building/white.png" alt="" /> : <Image fill src="/PhooRes/Building/lotusDesign.png" alt="" />}
        </div>
        <span className="transition-all duration-300 group-hover:px-2 text-white!">{children}</span>
        <div className="relative w-8 h-8 shrink-0 transition-transform duration-500 group-hover:-rotate-180 group-hover:scale-110">
          {white ? <Image fill src="/PhooRes/Building/white.png" alt="" /> : <Image fill src="/PhooRes/Building/lotusDesign.png" alt="" />}
        </div>
      </button>
    )
  }
)
Button.displayName = "Button";
export default Button;
