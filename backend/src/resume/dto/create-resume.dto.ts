import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { z } from 'zod';

export class CreateResumeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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

export const CreateResumeSchema = z.object({
  name: z.string().nonempty(),
  summary: z.string().optional(),
  experience: z.string().optional(),
  education: z.string().optional(),
  skills: z.string().optional(),
});
