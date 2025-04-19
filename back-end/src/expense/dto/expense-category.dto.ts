import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ExpenseCategoryDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  code: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  maximumAmount: number;
}
