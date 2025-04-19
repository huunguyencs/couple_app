import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateExpenseCategoryDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  maximumAmount: number;
}
