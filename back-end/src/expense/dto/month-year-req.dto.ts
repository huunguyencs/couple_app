import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
export class MonthYearReqDto {
  @ApiProperty({
    required: false,
    description: 'Month',
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  month?: number;

  @ApiProperty({
    required: false,
    description: 'Year',
    example: 2021,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  year?: number;
}
