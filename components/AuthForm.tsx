"use client";

import authFormSchema from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCallback, useState } from "react";
import AuthInput from "./AuthInput";
import { Button } from "./ui/button";
import AuthButton from "./AuthButton";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Input = z.infer<typeof authFormSchema>;
type Variant = "LOGIN" | "REGISTER";

function AuthForm() {
  const [variant, setVariant] = useState<Variant>("REGISTER");

  // define the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // handle form submission
  const onSubmit = (data: Input) => {
    // TODO: handle form submission
  };

  return (
    <div className="mx-auto mt-4 sm:w-full sm:max-w-md">
      <div className=" bg-white/30 px-4 py-8 shadow-xl sm:rounded-lg sm:px-10">
        <p className="mb-4 text-center text-sm font-light text-gray-500">
          Ready to Learn? Sign in or create an account to get started
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Register a user */}
          {variant === "REGISTER" && (
            <AuthInput
              id="name"
              label="Name"
              register={register}
              errors={errors}
              required
            />
          )}
          <AuthInput
            id="email"
            label="Email Address"
            type="email"
            register={register}
            errors={errors}
            required
          />
          <AuthInput
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            required
          />

          <div>
            <AuthButton fullWidth type="submit">
              {variant === "REGISTER" ? "Register" : "Login"}
            </AuthButton>
          </div>
        </form>

        {/* Social Sign in */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-[32%] border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500">Or continue with</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-end">
              <div className="w-[32%] border-t border-gray-300" />
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              // todo: add event listener to sign in with socials
            />
            <AuthSocialButton icon={BsGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
