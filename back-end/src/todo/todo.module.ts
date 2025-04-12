import { Module } from '@nestjs/common';
import { databaseConfig } from '../config/database.config';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [databaseConfig],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
