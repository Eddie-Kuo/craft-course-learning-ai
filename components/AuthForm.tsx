"use client";

import authFormSchema from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import AuthInput from "./AuthInput";

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
    <div className="mx-auto mt-8 sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
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
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
