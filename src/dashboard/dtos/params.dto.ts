import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ParamsDTO {
    @Type(() => Date)
    @IsDate()
    start_date: Date;

    @Type(() => Date)
    @IsDate()
    end_date: Date;
}
