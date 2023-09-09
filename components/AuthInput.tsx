"use client";

import { cn } from "@/lib/utils";
import authFormSchema from "@/lib/validations/auth";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { z } from "zod";

type Input = z.infer<typeof authFormSchema>;

interface AuthInputProps {
  label: string;
  id: "name" | "email" | "password";
  type?: string;
  required?: boolean;
  register: UseFormRegister<Input>;
  errors: FieldErrors;
  disabled?: boolean;
}

function AuthInput({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}: AuthInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        // handles all our onChange, onFocus, onBlur functions for us
        {...register(id, { required })}
        placeholder=""
        className={cn(
          "text-md text-darkText peer block w-full appearance-none rounded-md bg-neutral-100 px-3 pb-1 pt-5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-slate-300",
          errors[id] && "focus:ring-rose-500",
          disabled && "cursor-default opacity-50",
        )}
      />
      <label
        htmlFor={id}
        className="text-md absolute left-3 top-3 z-10 origin-[0] -translate-y-3 scale-75 transform text-zinc-400 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
      >
        {label}
      </label>
    </div>
  );
}

export default AuthInput;
