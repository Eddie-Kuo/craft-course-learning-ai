"use client";

import createChapterSchema from "@/lib/validations/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";

type CourseInput = z.infer<typeof createChapterSchema>;

function CreateCourseForm() {
  const form = useForm<CourseInput>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form></form>
      </Form>
    </div>
  );
}

export default CreateCourseForm;
