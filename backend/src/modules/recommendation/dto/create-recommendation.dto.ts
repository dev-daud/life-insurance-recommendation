import { IsNotEmpty, IsNumber, IsString, IsIn, Min, Max } from 'class-validator';

export class CreateRecommendationDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(18)
  @Max(80)
  age: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  income: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  dependents: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['low', 'medium', 'high'])
  riskTolerance: string;
} 
