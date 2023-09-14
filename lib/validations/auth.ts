"use client";

import * as z from "zod";

const authFormSchema = z.object({
  name: z.string(),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default authFormSchema;
