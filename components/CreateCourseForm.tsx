"use client";

import createChapterSchema from "@/lib/validations/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

type CourseInput = z.infer<typeof createChapterSchema>;

function CreateCourseForm() {
  const form = useForm<CourseInput>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  const onSubmit = (data: CourseInput) => {};

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="flex w-full items-center space-y-0">
                  <FormLabel className="flex-[1] px-1 text-xl font-semibold">
                    Title
                  </FormLabel>
                  <FormControl className="flex-[8]">
                    <Input
                      placeholder=" Enter a main topic you want to learn more about"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          {form.watch("units").map((_, index) => {
            return (
              <FormField
                control={form.control}
                name={`units.${index}`}
                key={index}
                render={({ field }) => {
                  return (
                    <FormItem className="flex w-full flex-col items-start space-y-0 pt-2 sm:flex-row sm:items-center">
                      <FormLabel className="flex-[1] px-1 text-xl font-semibold">
                        Unit {index + 1}
                      </FormLabel>
                      <FormControl className="flex-[8]">
                        <Input
                          placeholder="Enter subtopic of choice for the course"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            );
          })}
        </form>
      </Form>
    </div>
  );
}

export default CreateCourseForm;
