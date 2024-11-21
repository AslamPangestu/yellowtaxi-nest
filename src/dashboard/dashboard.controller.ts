import {
    Controller,
    Get,
    Query
} from '@nestjs/common';

import { DashboardService } from './dashboard.service';
import { ParamsDTO } from './dtos/params.dto';

@Controller('dashboard')
export class DashboardController {
    constructor(private service: DashboardService) { }

    @Get('')
    async getAll(@Query() query: ParamsDTO) {
        const [totalVendorTrip, totalVendorRevenue, averageVendorDistance, peakHours, revenue, averageFareByPaymentType, tripDuration, tripByPassenger, pickupLocation, revenueByRateCode, tipDistribution] = await Promise.all([
            this.service.totalVendorTrip(query),
            this.service.totalVendorRevenue(query),
            this.service.averageVendorDistance(query),
            this.service.peakHours(query),
            this.service.revenue(query),
            this.service.averageFareByPaymentType(query),
            this.service.tripDuration(query),
            this.service.tripByPassenger(query),
            this.service.pickupLocation(query),
            this.service.revenueByRateCode(query),
            this.service.tipDistribution(query)
        ]);

        return {
            totalVendorTrip,
            totalVendorRevenue,
            averageVendorDistance,
            peakHours,
            revenue,
            averageFareByPaymentType,
            tripDuration,
            tripByPassenger,
            pickupLocation,
            revenueByRateCode,
            tipDistribution
        }
    }
}
