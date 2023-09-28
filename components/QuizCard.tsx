"use client";
import { cn } from "@/lib/utils";
import { Chapter, Question } from "@prisma/client";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
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
    <div className="ml-8 mt-52 flex-[1]">
      <h1>Concept Check</h1>
      <div>
        {chapter.questions.map((question) => {
          const options = JSON.parse(question.options) as string[];
          return (
            <div
              key={question.id}
              className={cn(
                "mt-6 rounded-md border border-zinc-400 p-2",
                questionState[question.id] === false && "bg-red-500",
                questionState[question.id] === true && "bg-green-500",
                questionState[question.id] === null && "bg-secondary",
              )}
            >
              <h1 className="font-semibold">{question.question}</h1>
              <div className="py-2">
                <RadioGroup>
                  {options.map((option, index) => {
                    return (
                      <div key={index} className="flex gap-2">
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
      <Button onClick={checkAnswer} className="mt-2 w-full">
        Check Answer
      </Button>
    </div>
  );
}

export default QuizCard;
