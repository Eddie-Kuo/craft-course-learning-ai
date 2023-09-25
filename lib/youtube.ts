import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";

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
