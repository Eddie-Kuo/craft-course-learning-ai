import prisma from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import {
  getQuestionsFromTranscript,
  getTranscript,
  searchYoutube,
} from "@/lib/youtube";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodyParser = z.object({
  chapterId: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { chapterId } = bodyParser.parse(body);

    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter) {
      return new NextResponse("Could not find chapter in database", {
        status: 400,
      });
    }

    // youtube api
    const videoId = await searchYoutube(chapter.youtubeSearchQuery);
    let transcript = await getTranscript(videoId);
    let maxLength = 500;
    transcript = transcript.split(" ").slice(0, maxLength).join(" ");

    const { summary }: { summary: string } = await strict_output(
      "You are an AI capable of summarizing a youtube transcript",
      "Summarize in 250 words or less and do not talk about the sponsors, anything unrelated to the main topic, or introduce what the summary is about.\n" +
        transcript,
      { summary: "Summary of the transcript" },
    );

    // video questions
    const questions = await getQuestionsFromTranscript(
      transcript,
      chapter.name,
    );

    await prisma.question.createMany({
      data: questions.map((question) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        // shuffle answer and option choices
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          chapterId,
        };
      }),
    });

    await prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        videoId,
        summary,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json("Error fetching chapter information", {
        status: 400,
      });
    }
  }
}
