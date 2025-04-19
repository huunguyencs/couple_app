import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { ExpenseCategoryDto } from 'src/expense/dto/expense-category.dto';

export class ExpenseDto {
  @IsDateString()
  date: string;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @ApiProperty({
    type: ExpenseCategoryDto,
  })
  category: ExpenseCategoryDto;

  @IsNumber()
  monthlyId: number;
}
