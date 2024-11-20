import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trip } from 'src/trips/trips.entity';

@Controller('dashboard')
export class DashboardController {
    constructor(@InjectRepository(Trip) private tripRepository: Repository<Trip>) { }

    async getAll() {
    }
}
