import * as z from "zod";

const createChapterSchema = z.object({
  title: z.string().min(3).max(100),
  units: z.array(z.string()),
});

export default createChapterSchema;
