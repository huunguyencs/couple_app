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
import { CreateRestaurantDto } from 'src/restaurant/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/restaurant/dto/update-restaurant.dto';
import { RestaurantDto } from './dto/restaurant.dto';
import { RestaurantService } from './restaurant.service';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @ApiOperation({ summary: 'Get all restaurants' })
  async findAll(): Promise<RestaurantDto[]> {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get restaurant by id' })
  async findOne(@Param('id') id: number): Promise<RestaurantDto> {
    return this.restaurantService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create restaurant' })
  async create(
    @Body() restaurant: CreateRestaurantDto,
  ): Promise<RestaurantDto> {
    return this.restaurantService.create(restaurant);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update restaurant' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() restaurant: UpdateRestaurantDto,
  ): Promise<RestaurantDto> {
    return this.restaurantService.update(id, restaurant);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete restaurant' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.restaurantService.remove(id);
  }
}
