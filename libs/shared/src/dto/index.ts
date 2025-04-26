import { z } from 'zod';

export const CreateResumeSchema = z.object({
  name: z.string().nonempty(),
  summary: z.string().optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  skills: z.string().optional(),
});

export const UpdateResumeSchema = z.object({
  name: z.string().optional(),
  summary: z.string().optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  skills: z.string().optional(),
});
