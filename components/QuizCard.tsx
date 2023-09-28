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

  console.log(chapter.questions);

  return (
    <>
      <div className="ml-8 mt-52 flex-[1]">
        <h1 className="text-lg font-semibold">Concept Check</h1>
        {chapter.questions.length >= 1 ? (
          <>
            <div>
              {chapter.questions.map((question) => {
                const options = JSON.parse(question.options) as string[];
                return (
                  <div
                    key={question.id}
                    className={cn(
                      "mt-3 rounded-md border border-zinc-400 bg-zinc-500/40 p-4",
                      questionState[question.id] === false && "bg-red-500",
                      questionState[question.id] === true && "bg-green-500",
                    )}
                  >
                    <h1 className="font-semibold">{question.question}</h1>
                    <div className="py-2">
                      <RadioGroup
                        onValueChange={(e) => {
                          setAnswer((prev) => {
                            return {
                              ...prev,
                              [question.id]: e,
                            };
                          });
                        }}
                      >
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
          </>
        ) : (
          <h2>No quiz available for this chapter</h2>
        )}
      </div>
    </>
  );
}

export default QuizCard;
