import { Module } from '@nestjs/common';
import { databaseConfig } from '../config/database.config';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

@Module({
  imports: [databaseConfig],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
