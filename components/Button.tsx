import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  varient?: string;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, varient = "primary", icon, type = "button", ...props }, ref) => {
    return (
      <button type={type} ref={ref} className={`${className} bg-red-600! flex items-center text-white! px-5 py-3 rounded-full gap-2 text-md font-bold hover:bg-red-700! transition-all duration-300 cursor-pointer `} {...props}>
        {children}
        {icon && icon}
      </button>
    )
  }
)
Button.displayName = "Button";
export default Button;
