"use client";
import { Chapter, Question } from "@prisma/client";
import { useCallback, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

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

  return (
    <div>
      <h1>Concept Check</h1>
      <div>
        {chapter.questions.map((question) => {
          const options = JSON.parse(question.options) as string[];
          return (
            <div key={question.id}>
              <h1>{question.question}</h1>
              <div>
                <RadioGroup>
                  {options.map((option, index) => {
                    return (
                      <div key={index}>
                        <RadioGroupItem
                          value={option}
                          id={question.id + index.toString()}
                        />
                        <Label htmlFor={question.id + index.toString()}>
                          {option}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuizCard;
