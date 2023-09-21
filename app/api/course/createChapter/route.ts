import createChapterSchema from "@/lib/validations/course";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, units } = createChapterSchema.parse(body);

    type outputUnits = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    };

    // wrap the gpt api such that we can give the api the ideal shape of our json. however if the api return doesn't match, we can re feed the error back to open ai to generate another request
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid request", { status: 400 });
    }
  }
}
