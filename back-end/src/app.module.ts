import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MilestonesModule } from './milestones/milestones.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MilestonesModule,
    TodoModule,
    RestaurantModule,
  ],
})
export class AppModule {}
