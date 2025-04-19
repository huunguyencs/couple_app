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
import { CreateMilestoneDto } from 'src/milestones/dto/create-milestone.dto';
import { UpdateMilestoneDto } from 'src/milestones/dto/update-milestone.dto';
import { MilestoneDto } from './dto/milestone.dto';
import { MilestonesService } from './milestones.service';

@ApiTags('Milestones')
@Controller('milestones')
export class MilestonesController {
  constructor(private readonly milestonesService: MilestonesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all milestones' })
  async findAll(): Promise<MilestoneDto[]> {
    return this.milestonesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get milestone by id' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<MilestoneDto> {
    return this.milestonesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create milestone' })
  async create(@Body() milestone: CreateMilestoneDto): Promise<MilestoneDto> {
    return this.milestonesService.create(milestone);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update milestone' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() milestone: UpdateMilestoneDto,
  ): Promise<MilestoneDto> {
    return this.milestonesService.update(id, milestone);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete milestone' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.milestonesService.remove(id);
  }
}
