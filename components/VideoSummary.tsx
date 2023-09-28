import { Chapter, Unit } from "@prisma/client";

interface VideoSummary {
  chapter: Chapter;
  unit: Unit;
  unitIndex: number;
  chapterIndex: number;
}

function VideoSummary({
  chapter,
  unit,
  unitIndex,
  chapterIndex,
}: VideoSummary) {
  return (
    <div className="mt-44 flex-[2]">
      <h4 className="text-md uppercase text-secondary-foreground/60">
        Unit {unitIndex + 1} &bull; Chapter {chapterIndex + 1}
      </h4>
      <h1 className="text-2xl font-semibold tracking-wide">{chapter.name}</h1>
      <iframe
        title="chapter video"
        className="mt-4 aspect-video max-h-[24rem] w-full"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
      <div className="mt-4">
        <h3 className="text-3xl font-semibold">Summary</h3>
        <p className="mt-2 text-secondary-foreground/80">{chapter.summary}</p>
      </div>
    </div>
  );
}

export default VideoSummary;
