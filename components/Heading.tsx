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
        className={`font-semibold capitalize text-5xl md:text-6xl lg:text-8xl px-4 md:px-8 lg:px-0 ${className}`}
        style={style}
      >
        {children}
      </h1>
    );
  }
);

Heading.displayName = "Heading";
export default Heading;