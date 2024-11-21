import { Controller, Get, Query } from '@nestjs/common';

import { GetAllDTO } from './dtos/get-all.dto';
import { TripsService } from './trips.service';

@Controller()
export class TripsController {
  constructor(private service: TripsService) {}

  @Get('trips')
  async getAll(@Query() query: GetAllDTO) {
    if (query.radius > 10000) {
      return this.service.findClusters(query);
    }
    return this.service.findAll(query);
  }

  @Get('payment-types')
  async getPaymentTypes() {
    const OPTIONS = {
      CRD: 'Credit Card',
      CSH: 'Cash',
      NOC: 'No Charge',
      DIS: 'Dispute',
      UNK: 'Unknown',
      VOD: 'Voided',
    };
    const response: Array<{ payment_type: keyof typeof OPTIONS }> =
      await this.service.findPaymentTypes();
    // return response;
    return response.map((item) => ({
      value: item.payment_type,
      label: OPTIONS[item.payment_type],
    }));
  }
}
