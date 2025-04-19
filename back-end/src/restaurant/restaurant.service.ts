import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DB_PROVIDER } from '../config/database.config';
import * as schema from '../schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantDto } from './dto/restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

const restaurants = schema.restaurants;
@Injectable()
export class RestaurantService {
  constructor(
    @Inject(DB_PROVIDER)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findAll(): Promise<RestaurantDto[]> {
    return this.db.select().from(restaurants);
  }

  async findOne(id: number): Promise<RestaurantDto> {
    const result = await this.db
      .select()
      .from(restaurants)
      .where(eq(restaurants.id, id));
    return result[0];
  }

  async create(restaurant: CreateRestaurantDto): Promise<RestaurantDto> {
    const result = await this.db
      .insert(restaurants)
      .values(restaurant)
      .returning();
    return result[0];
  }

  async update(
    id: number,
    restaurant: UpdateRestaurantDto,
  ): Promise<RestaurantDto> {
    const result = await this.db
      .update(restaurants)
      .set(restaurant)
      .where(eq(restaurants.id, id))
      .returning();
    return result[0];
  }

  async remove(id: number): Promise<void> {
    await this.db.delete(restaurants).where(eq(restaurants.id, id));
  }
}
