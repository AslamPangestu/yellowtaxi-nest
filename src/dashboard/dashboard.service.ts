import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trip } from 'src/trips/trips.entity';

@Injectable()
export class DashboardService {
    constructor(@InjectRepository(Trip) private repository: Repository<Trip>) { }

    async getReport() {
    }
}
