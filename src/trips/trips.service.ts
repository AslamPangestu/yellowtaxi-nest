import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trip } from './trips.entity';
import { PaginationDTO } from './dtos/pagination.dto';

@Injectable()
export class TripsService {
    constructor(@InjectRepository(Trip) private repository: Repository<Trip>) { }

    async getAll(query: PaginationDTO) {
        const { page, limit } = query;
        const [result, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit, });
        return { data: result, count: total, totalPage: Math.ceil(total / limit), };
    }
}
