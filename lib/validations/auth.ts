"use client";

import * as z from "zod";

const authFormSchema = z.object({
  name: z.string(),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default authFormSchema;

//* Bug: Signing in user on initial page load wouldn't work.
// button would not register and come off as disabled
// Problem: The zod resolver was trying to validate a non existent name field.
// Temp Fix: removed the minimum requirements for at least 3 characters in the name field
