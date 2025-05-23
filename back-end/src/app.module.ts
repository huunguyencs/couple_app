import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExpenseModule } from './expense/expense.module';
import { MilestonesModule } from './milestones/milestones.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TodoModule } from './todo/todo.module';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MilestonesModule,
    TodoModule,
    RestaurantModule,
    UploadModule,
    ExpenseModule,
  ],
})
export class AppModule {}
