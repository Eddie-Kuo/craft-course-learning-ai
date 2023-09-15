"use client";

import authFormSchema from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";
import * as z from "zod";
import AuthButton from "./AuthButton";
import AuthInput from "./AuthInput";
import AuthSocialButton from "./AuthSocialButton";

type AuthInput = z.infer<typeof authFormSchema>;
type Variant = "LOGIN" | "REGISTER";

function AuthForm() {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  // toggle between login and register
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  // redirect authenticated users to dashboard
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session?.status, router]);

  // define the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInput>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // handle form submission
  const onFormSubmit: SubmitHandler<AuthInput> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      // Axios Register
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Registration failed. Please try again!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      // NextAuth Sign In
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid Credentials!");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logging In!");
            router.push("/dashboard");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  // sign in with socials submit handler
  const socialSignIn = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Sign in failed. Please try again!");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logging in!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mx-auto mt-4 sm:w-full sm:max-w-md">
      <div className=" bg-white/30 px-4 py-8 shadow-xl sm:rounded-lg sm:px-10">
        <p className="mb-4 text-center text-sm font-light text-gray-500">
          Ready to Learn? Sign in or create an account to get started
        </p>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-3">
          {/* Register a user */}
          {variant === "REGISTER" && (
            <>
              <AuthInput
                id="name"
                label="Name"
                register={register}
                errorMessage={errors.name?.message}
                required
              />
            </>
          )}
          <AuthInput
            id="email"
            label="Email Address"
            type="name"
            register={register}
            errorMessage={errors.email?.message}
            required
          />

          <AuthInput
            id="password"
            label="Password"
            type="password"
            register={register}
            errorMessage={errors.password?.message}
            required
          />

          <div>
            <AuthButton fullWidth type="submit" disabled={isLoading}>
              {variant === "LOGIN" ? "Sign In" : "Register"}
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
              onClick={() => socialSignIn("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialSignIn("google")}
            />
          </div>
        </div>

        {/* Toggle between login and register */}
        <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
          <div>
            {variant === "REGISTER" ? "Already have an account?" : "New here?"}
          </div>
          <div onClick={toggleVariant} className="cursor-pointer underline">
            {variant === "REGISTER" ? "Login" : "Create an Account"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
