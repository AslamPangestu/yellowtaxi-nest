import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trip } from 'src/trips/trips.entity';

import { ParamsDTO } from './dtos/params.dto';

@Injectable()
export class DashboardService {
  constructor(@InjectRepository(Trip) private repository: Repository<Trip>) {}

  async totalVendorTrip(query: ParamsDTO) {
    return this.repository
      .createQueryBuilder('trip')
      .select('trip.vendor_id', 'vendor_id')
      .addSelect('COUNT(trip.id)', 'total_trips')
      .where('trip.pickup_datetime BETWEEN :start_date AND :end_date', {
        start_date: query.start_date,
        end_date: query.end_date,
      })
      .groupBy('trip.vendor_id')
      .getRawMany();
  }

  async totalVendorRevenue(query: ParamsDTO) {
    return this.repository
      .createQueryBuilder('trip')
      .select('trip.vendor_id', 'vendor_id')
      .addSelect('SUM(trip.total_amount)', 'total_revenue')
      .where('trip.pickup_datetime BETWEEN :start_date AND :end_date', {
        start_date: query.start_date,
        end_date: query.end_date,
      })
      .groupBy('trip.vendor_id')
      .getRawMany();
  }

  async averageVendorDistance(query: ParamsDTO) {
    return this.repository
      .createQueryBuilder('trip')
      .select('trip.vendor_id', 'vendor_id')
      .addSelect('AVG(trip.trip_distance)', 'average_distance')
      .where('trip.pickup_datetime BETWEEN :start_date AND :end_date', {
        start_date: query.start_date,
        end_date: query.end_date,
      })
      .groupBy('trip.vendor_id')
      .getRawMany();
  }

  async peakHours(query: ParamsDTO) {
    return this.repository
      .createQueryBuilder('trip')
      .select('EXTRACT(HOUR FROM trip.pickup_datetime)', 'hour')
      .addSelect('COUNT(trip.id)', 'total_trips')
      .where('trip.pickup_datetime BETWEEN :start_date AND :end_date', {
        start_date: query.start_date,
        end_date: query.end_date,
      })
      .groupBy('hour')
      .orderBy('hour')
      .getRawMany();
  }

  async revenue(query: ParamsDTO) {
    return this.repository
      .createQueryBuilder('trip')
      .select('EXTRACT(DOW FROM trip.pickup_datetime)', 'day_of_week')
      .addSelect('SUM(trip.total_amount)', 'total_revenue')
      .where('trip.pickup_datetime BETWEEN :start_date AND :end_date', {
        start_date: query.start_date,
        end_date: query.end_date,
      })
      .groupBy('day_of_week')
      .orderBy('day_of_week')
      .getRawMany();
  }

  async averageFareByPaymentType(query: ParamsDTO) {
    return this.repository
      .createQueryBuilder('trip')
      .select('trip.payment_type', 'payment_type')
      .addSelect('AVG(trip.fare_amount)', 'average_fare')
      .where('trip.pickup_datetime BETWEEN :start_date AND :end_date', {
        start_date: query.start_date,
        end_date: query.end_date,
      })
      .groupBy('trip.payment_type')
      .getRawMany();
  }

  async tripDuration(query: ParamsDTO) {
    return this.repository
      .createQueryBuilder('trip')
      .select(
        'EXTRACT(EPOCH FROM (trip.dropoff_datetime - trip.pickup_datetime))/60',
        'trip_duration_minutes',
      )
      .where('trip.pickup_datetime BETWEEN :start_date AND :end_date', {
        start_date: query.start_date,
        end_date: query.end_date,
      })
      .getRawMany();
  }

  async tripByPassenger(query: ParamsDTO) {
    return this.repository
      .createQueryBuilder('trip')
      .select('trip.passenger_count', 'passenger_count')
      .addSelect('COUNT(trip.id)', 'total_trips')
      .where('trip.pickup_datetime BETWEEN :start_date AND :end_date', {
        start_date: query.start_date,
        end_date: query.end_date,
      })
      .groupBy('trip.passenger_count')
      .orderBy('trip.passenger_count')
      .getRawMany();
  }

  async pickupLocation(query: ParamsDTO) {
    return this.repository
      .createQueryBuilder('trip')
      .select('ST_X(trip.pickup_location::geometry)', 'longitude')
      .addSelect('ST_Y(trip.pickup_location::geometry)', 'latitude')
      .where('trip.pickup_datetime BETWEEN :start_date AND :end_date', {
        start_date: query.start_date,
        end_date: query.end_date,
      })
      .getRawMany();
  }

  async revenueByRateCode(query: ParamsDTO) {
    return this.repository
      .createQueryBuilder('trip')
      .select('trip.rate_code', 'rate_code')
      .addSelect('SUM(trip.total_amount)', 'total_revenue')
      .where('trip.pickup_datetime BETWEEN :start_date AND :end_date', {
        start_date: query.start_date,
        end_date: query.end_date,
      })
      .groupBy('trip.rate_code')
      .getRawMany();
  }

  async tipDistribution(query: ParamsDTO) {
    return this.repository
      .createQueryBuilder('trip')
      .select('trip.tip_amount', 'tip_amount')
      .where('trip.pickup_datetime BETWEEN :start_date AND :end_date', {
        start_date: query.start_date,
        end_date: query.end_date,
      })
      .getRawMany();
  }
}
