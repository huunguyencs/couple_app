import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB_PROVIDER } from '../config/database.config';
import * as schema from '../schema';
import { todos } from '../schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
@Injectable()
export class TodoService {
  constructor(
    @Inject(DB_PROVIDER)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll(): Promise<TodoDto[]> {
    const result = await this.db.select().from(todos);
    return result.map((item) => ({
      ...item,
      dueDate: item.dueDate?.toISOString(),
    }));
  }

  async findOne(id: number): Promise<TodoDto> {
    const result = await this.db.select().from(todos).where(eq(todos.id, id));
    const item = result[0];
    return {
      ...item,
      dueDate: item.dueDate?.toISOString(),
    };
  }

  async create(todo: CreateTodoDto): Promise<TodoDto> {
    const values = {
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
      completed: todo.completed,
      priority: todo.priority,
    };
    const result = await this.db.insert(todos).values(values).returning();
    const item = result[0];
    return {
      ...item,
      dueDate: item.dueDate?.toISOString(),
    };
  }

  async update(id: number, todo: UpdateTodoDto): Promise<TodoDto> {
    const values = {
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
      completed: todo.completed,
      priority: todo.priority,
    };
    const result = await this.db
      .update(todos)
      .set(values)
      .where(eq(todos.id, id))
      .returning();
    const item = result[0];
    return {
      ...item,
      dueDate: item.dueDate?.toISOString(),
    };
  }

  async remove(id: number): Promise<void> {
    await this.db.delete(todos).where(eq(todos.id, id));
  }
}
