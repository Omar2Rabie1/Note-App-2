// schemas/noteSchema.ts
import { z } from 'zod';

export const noteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  content: z.string().min(1, 'Content is required').max(1000, 'Content is too long'),
});

export type NoteFormInput = z.infer<typeof noteSchema>;