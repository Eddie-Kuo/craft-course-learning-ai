"use client";

import { Chapter, Course, Unit } from "@prisma/client";

interface ConfirmChaptersProps {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
}

function ConfirmChapters({ course }: ConfirmChaptersProps) {
  return <div>ConfirmChapters</div>;
}

export default ConfirmChapters;
