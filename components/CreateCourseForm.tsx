"use client";

import createChapterSchema from "@/lib/validations/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { z } from "zod";
import SubscriptionAction from "./SubscriptionAction";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

type CourseInput = z.infer<typeof createChapterSchema>;

function CreateCourseForm() {
  const router = useRouter();

  const session = useSession();
  const userId = session?.data?.user?.id;

  // mutation is any action (create/update/delete) that hits an api endpoint - mutate renamed to createChapter
  const { mutate: createChapter, isLoading } = useMutation({
    mutationFn: async ({ title, units }: CourseInput) => {
      const response = await axios.post("/api/course/createChapter", {
        title,
        units,
        userId,
      });
      return response.data;
    },
  });

  const form = useForm<CourseInput>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  const onSubmit = (data: CourseInput) => {
    if (data.units.some((unit) => unit === "")) {
      toast.error("Please fill out all available fields.");
      return;
    }
    //mutation function
    createChapter(data, {
      onSuccess: ({ course_id }) => {
        toast.success("Success! Setting up your course.");
        router.push(`/create/${course_id}`);
      },
      onError: (error) => {
        console.log("Error encountered while generating course");
        toast.error("Server Issue. Please try again later!");
      },
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="flex w-full flex-col items-start space-y-0 sm:flex-row sm:items-center">
                  <FormLabel className="flex-[1] px-1 text-xl font-semibold">
                    Title
                  </FormLabel>
                  <FormControl className="flex-[8]">
                    <Input
                      className="focus-visible:ring-slate-500"
                      placeholder="Enter a main topic you want to learn more about"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <AnimatePresence>
            {form.watch("units").map((_, index) => {
              return (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    height: { duration: 0.2 },
                  }}
                  key={index}
                >
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
                              className="focus-visible:ring-slate-500"
                              placeholder="Enter subtopic of choice for the course"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="mt-4 flex items-center justify-center">
            <Separator className="flex-[1] bg-zinc-400" />
            <div className="mx-4 flex gap-2">
              <Button
                type="button"
                onClick={() => {
                  form.setValue("units", [...form.watch("units"), ""]);
                }}
                variant="secondary"
                className="bg-zinc-100 font-bold hover:bg-zinc-300"
              >
                Add Unit
                <AiOutlinePlus className="ml-2 h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={() => {
                  form.setValue("units", form.watch("units").slice(0, -1));
                }}
                variant="destructive"
                className="bg-rose-700 font-bold hover:bg-rose-800"
              >
                Remove Unit
                <RiDeleteBin5Line className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Separator className="flex-[1] bg-zinc-400" />
          </div>

          <Button
            type="submit"
            className="mt-4 w-full bg-sky-500 font-semibold hover:bg-sky-400"
            variant="secondary"
            size="lg"
            disabled={isLoading}
          >
            Generate Course!
          </Button>
        </form>
      </Form>

      <SubscriptionAction />
    </div>
  );
}

export default CreateCourseForm;
