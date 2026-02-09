"use client";

import { forwardRef } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "white";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover border-transparent shadow-sm",
  outline:
    "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white",
  ghost: "bg-transparent text-foreground hover:bg-gray-100 border-transparent",
  white:
    "bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      children,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`
          inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 min-h-[44px]
          font-semibold transition-all duration-200 border
          hover:scale-[1.02] active:scale-[0.98]
          disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100 disabled:active:scale-100
          touch-manipulation
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
