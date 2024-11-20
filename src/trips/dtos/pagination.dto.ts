import { IsInt, Min } from 'class-validator';

export class PaginationDTO {
  @IsInt()
  @Min(1)
  readonly page: number;

  @IsInt()
  @Min(1)
  readonly limit: number;
}
