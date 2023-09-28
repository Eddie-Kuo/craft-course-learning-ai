"use client";
import { Chapter, Question } from "@prisma/client";
import { useCallback, useState } from "react";

interface QuizCardProps {
  chapter: Chapter & {
    questions: Question[];
  };
}

function QuizCard({ chapter }: QuizCardProps) {
  const [answer, setAnswer] = useState<Record<string, string>>({});
  const [questionState, setQuestionState] = useState<
    Record<string, boolean | null>
  >({});

  const checkAnswer = useCallback(() => {
    const newQuestionState = { ...questionState };
    chapter.questions.forEach((question) => {
      const userAnswer = answer[question.id];
      if (!userAnswer) return;

      if (userAnswer === question.answer) {
        newQuestionState[question.id] = true;
      } else {
        newQuestionState[question.id] = false;
      }

      setQuestionState(newQuestionState);
    });
  }, [answer, questionState, chapter.questions]);

  return <div>Hello</div>;
}

export default QuizCard;
