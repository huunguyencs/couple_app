import { Module } from '@nestjs/common';
import { databaseConfig } from '../config/database.config';
import { MilestonesController } from './milestones.controller';
import { MilestonesService } from './milestones.service';

@Module({
  imports: [databaseConfig],
  controllers: [MilestonesController],
  providers: [MilestonesService],
})
export class MilestonesModule {}
