import Link from "next/link";
import React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  href?: string;
}

type ButtonProps = SharedProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseClass =
  "relative inline-flex items-center justify-center overflow-hidden border px-5 font-sans text-xs uppercase tracking-widest transition duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--text]";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border-[--text] bg-[--text] text-[--bg] hover:bg-[--accent] hover:text-[--text]",
  outline:
    "border-[--text] bg-transparent text-[--text] before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-[--text] before:transition before:duration-300 hover:text-[--bg] hover:before:scale-x-100",
  ghost:
    "border-transparent bg-transparent px-0 text-[--text] underline-offset-4 hover:underline",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4",
  md: "h-10 px-5",
  lg: "h-12 px-6",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    fullWidth,
    children,
    href,
    ...rest
  } = props;

  const classes =
    `${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${
      fullWidth ? "w-full" : ""
    } ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
