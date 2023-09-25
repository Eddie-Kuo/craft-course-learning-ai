import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output } from "./gpt";

export async function searchYoutube(searchQuery: string) {
  // hello world => hello+world
  searchQuery = encodeURIComponent(searchQuery);

  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`,
  );

  if (!data) {
    console.log("youtube search failed");
    return null;
  }

  if (data.items[0] === undefined) {
    console.log("Could not find any videos with search query");
    return null;
  }

  return data.items[0].id.videoId;
}

export async function getTranscript(videoId: string) {
  try {
    let transcriptArr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
      country: "US",
    });

    let transcript = "";
    for (let t of transcriptArr) {
      transcript += t.text + " ";
    }

    return transcript.replaceAll("\n", "");
  } catch (error) {
    return "";
  }
}

export async function getQuestionsFromTranscript(
  transcript: string,
  courseTitle: string,
) {
  type Question = {
    question: string;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
  };

  const questions: Question[] = await strict_output(
    "You are a helpful AI that is able to generate mcq questions and answers. The length of each answer should not be more than 15 words",
    new Array(5).fill(
      `You are to generate a random hard mcq question about ${courseTitle} with context of the following transcript: ${transcript}`,
    ),
    {
      question: "question",
      answer: "answer with max length of 15 words",
      option1: "option 1 with max length of 15 words",
      option2: "option 2 with max length of 15 words",
      option3: "option 3 with max length of 15 words",
    },
  );

  return questions;
}
