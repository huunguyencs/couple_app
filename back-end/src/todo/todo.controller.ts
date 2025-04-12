import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateTodoDto } from 'src/todo/dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  async findAll(): Promise<TodoDto[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get todo by id' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TodoDto> {
    return this.todoService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create todo' })
  async create(@Body() todo: CreateTodoDto): Promise<TodoDto> {
    return this.todoService.create(todo);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update todo' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() todo: UpdateTodoDto,
  ): Promise<TodoDto> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete todo' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.remove(id);
  }
}
