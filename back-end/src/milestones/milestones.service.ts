import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateMilestoneDto } from 'src/milestones/dto/create-milestone.dto';
import { DB_PROVIDER } from '../config/database.config';
import * as schema from '../schema';
import { milestones } from '../schema';
import { MilestoneDto } from './dto/milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
@Injectable()
export class MilestonesService {
  constructor(
    @Inject(DB_PROVIDER)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll(): Promise<MilestoneDto[]> {
    const result = await this.db.select().from(milestones);
    return result.map((item) => ({
      ...item,
      date: item.date.toISOString(),
    }));
  }

  async findOne(id: number): Promise<MilestoneDto> {
    const result = await this.db
      .select()
      .from(milestones)
      .where(eq(milestones.id, id));
    const item = result[0];
    return {
      ...item,
      date: item.date.toISOString(),
    };
  }

  async create(milestone: CreateMilestoneDto): Promise<MilestoneDto> {
    const result = await this.db
      .insert(milestones)
      .values({
        ...milestone,
        date: new Date(milestone.date),
      })
      .returning();
    const item = result[0];
    return {
      ...item,
      date: item.date.toISOString(),
    };
  }

  async update(
    id: number,
    milestone: UpdateMilestoneDto,
  ): Promise<MilestoneDto> {
    const result = await this.db
      .update(milestones)
      .set({
        ...milestone,
        date: milestone.date ? new Date(milestone.date) : undefined,
      })
      .where(eq(milestones.id, id))
      .returning();
    const item = result[0];
    return {
      ...item,
      date: item.date.toISOString(),
    };
  }

  async remove(id: number): Promise<void> {
    await this.db.delete(milestones).where(eq(milestones.id, id));
  }
}
