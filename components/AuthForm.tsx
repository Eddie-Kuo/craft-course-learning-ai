"use client";

import authFormSchema from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "./ui/form";

type AuthInput = z.infer<typeof authFormSchema>;

function AuthForm() {
  // define the form
  const form = useForm<AuthInput>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // handle form submission
  const onSubmit = (data: AuthInput) => {
    // TODO: handle form submission
  };

  return (
    <div className="mx-auto mt-8 sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          ></form>
        </Form>
      </div>
    </div>
  );
}

export default AuthForm;
