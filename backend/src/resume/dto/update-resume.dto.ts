import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { z } from 'zod';

export class UpdateResumeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  experience?: string;

  @IsString()
  @IsOptional()
  education?: string;

  @IsString()
  @IsOptional()
  skills?: string;
}

export const UpdateResumeSchema = z.object({
  name: z.string().optional(),
  summary: z.string().optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  skills: z.string().optional(),
});
