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
        className={`${className} font-semibold capitalize text-8xl`}
        style={style}
      >
        {children}
      </h1>
    );
  }
);

Heading.displayName = "Heading";
export default Heading;