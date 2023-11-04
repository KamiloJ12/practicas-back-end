import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import { Knowledge } from './entities/knowledge.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class KnowledgeService {
  constructor(
    @InjectRepository(Knowledge)
    private knowledgeRepository: Repository<Knowledge>,
  ) {}

  async create(createKnowledgeDto: CreateKnowledgeDto): Promise<Knowledge> {
    const { name } = createKnowledgeDto;
    const knowledge = this.knowledgeRepository.create({
      name: name.toLowerCase(),
    });
    return await this.knowledgeRepository.save(knowledge);
  }

  async findAll(): Promise<Knowledge[]> {
    return await this.knowledgeRepository.find();
  }

  async findOne(id: number): Promise<Knowledge> {
    return await this.knowledgeRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateKnowledgeDto: UpdateKnowledgeDto,
  ): Promise<Knowledge> {
    const knowledge = await this.knowledgeRepository.preload({
      id,
      ...updateKnowledgeDto,
    });

    if (!knowledge) {
      throw new NotFoundException('resorce no found');
    }
    return await this.knowledgeRepository.save(knowledge);
  }

  async remove(id: number): Promise<{ id: number } & Knowledge> {
    const knowledge = await this.knowledgeRepository.findOneBy({
      id,
    });
    if (!knowledge) {
      throw new NotFoundException('resorce no found');
    }
    return await this.knowledgeRepository.softRemove(knowledge);
  }
}
