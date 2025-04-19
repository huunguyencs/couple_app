import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ExpenseMonthlyDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    type: String,
  })
  @IsString()
  time: string;
}
