import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Injectable()
export class ResumeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createResumeDto: CreateResumeDto) {
    return this.prisma.resume.create({
      data: createResumeDto,
    });
  }

  async findAll() {
    return this.prisma.resume.findMany({
      where: { deletedAt: null },
    });
  }

  async findOne(id: number) {
    return this.prisma.resume.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: number, updateResumeDto: UpdateResumeDto) {
    return this.prisma.resume.update({
      where: { id, deletedAt: null },
      data: updateResumeDto,
    });
  }

  async remove(id: number) {
    return this.prisma.resume.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
