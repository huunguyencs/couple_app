import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  categoryId: number;
}
