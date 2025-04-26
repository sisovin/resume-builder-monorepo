import { z } from 'zod';

export const validateSchema = (schema: z.ZodSchema, data: any) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.errors.map((err) => err.message).join(', '));
  }
  return result.data;
};
