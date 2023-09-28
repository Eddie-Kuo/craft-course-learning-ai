import { Chapter, Course, Unit } from "@prisma/client";

interface CourseSideBarProps {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
}

function CourseSideBar({ course }: CourseSideBarProps) {
  return <div>CourseSideBar</div>;
}

export default CourseSideBar;
