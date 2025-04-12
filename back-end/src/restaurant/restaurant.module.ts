import { Module } from '@nestjs/common';
import { databaseConfig } from '../config/database.config';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [databaseConfig],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
