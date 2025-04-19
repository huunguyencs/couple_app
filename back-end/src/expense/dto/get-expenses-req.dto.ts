import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class GetExpensesReqDto {
  @ApiProperty({
    description: 'The start date of the expense',
    example: '2021-01-01',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsDateString()
  from?: string;

  @ApiProperty({
    description: 'The end date of the expense',
    example: '2021-01-01',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsDateString()
  to?: string;

  @ApiProperty({
    description: 'The category id of the expense',
    example: '1',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiProperty({
    description: 'The offset of the expense',
    example: 0,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  offset?: number = 0;

  @ApiProperty({
    description: 'The limit of the expense',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 10;

  @ApiProperty({
    description: 'Order by',
    example: 'createdAt:asc',
    required: false,
  })
  @IsOptional()
  @IsString()
  order?: string;
}
