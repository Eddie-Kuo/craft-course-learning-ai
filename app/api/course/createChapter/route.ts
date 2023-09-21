import { strict_output } from "@/lib/gpt";
import getUnsplashImage from "@/lib/unsplash";
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

    let output_unit: outputUnits = await strict_output(
      "You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
      new Array(units.length).fill(
        `It is your job to create a course about ${title}. The user has requested to create chapters for each of the units. Then, for each chapter, provide a detailed youtube search query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube.`,
      ),
      {
        title: "title of the unit",
        chapters:
          "an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
      },
    );

    const imageSearchTerm = await strict_output(
      "You are an AI capable of finding the most relevant image for a course",
      `Please provide a good image search term for the title of a course: ${title}. The search term will be fed into the unsplash api so make sure the search term is accurate, relevant, and will return the best results.`,
      {
        image_search_term: "a good search term for the title of the course",
      },
    );

    const course_image = await getUnsplashImage(
      imageSearchTerm.image_search_term,
    );

    console.log(output_unit);
    return NextResponse.json({
      output_unit,
      imageSearchTerm,
      course_image,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid request", { status: 400 });
    }
  }
}
