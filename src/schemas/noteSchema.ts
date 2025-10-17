
import { z } from 'zod';


export const noteSchema = z.object({
  title: z.string().min(3, 'Title is required').max(100, 'Title is too long'),
  content: z.string().min(10, 'Content is required').max(2000, 'Content is too long'),

});

export type NoteFormInput = z.infer<typeof noteSchema>;