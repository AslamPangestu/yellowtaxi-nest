import { IsOptional, IsString, IsNumber, IsDate, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllDTO {
  @Type(() => Number)
  @IsNumber()
  longitude: number;

  @Type(() => Number)
  @IsNumber()
  latitude: number;

  @Type(() => Number)
  @IsNumber()
  radius: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start_date?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  end_date?: Date;

  @IsOptional()
  @IsString()
  payment_type?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  min_distance?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_distance?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  min_fare?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_fare?: number;
}
