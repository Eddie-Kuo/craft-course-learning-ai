import { Chapter, Question } from "@prisma/client";

interface QuizCardProps {
  chapter: Chapter & {
    questions: Question[];
  };
}

function QuizCard({ chapter }: QuizCardProps) {
  return <div>QuizCard</div>;
}

export default QuizCard;
