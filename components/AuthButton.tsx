"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  type?: "button" | "submit" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
  className?: string;
}

function AuthButton({
  type,
  fullWidth,
  children,
  onClick,
  danger,
  disabled,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        "flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        disabled && "cursor-default opacity-50",
        fullWidth && "w-full",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !danger &&
          "bg-slate-500 hover:bg-slate-600 focus-visible:outline-slate-600",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default AuthButton;
