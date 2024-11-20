import { Controller, Get, Query } from '@nestjs/common';

import { PaginationDTO } from './dtos/pagination.dto';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
    constructor(private service: TripsService) {}

    @Get()
    getAllItems(@Query() query: PaginationDTO) {
      return this.service.getAll(query);
    }
}
