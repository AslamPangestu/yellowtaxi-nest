import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trip } from './trips.entity';
import { GetAllDTO } from './dtos/get-all.dto';

@Injectable()
export class TripsService {
  constructor(@InjectRepository(Trip) private repository: Repository<Trip>) {}

  async findAll(query: GetAllDTO) {
    const conditions: string[] = [];
    if (query.start_date) {
      conditions.push(`pickup_datetime >= '${query.start_date.toISOString()}'`);
    }
    if (query.end_date) {
      conditions.push(`pickup_datetime <= '${query.end_date.toISOString()}'`);
    }
    if (query.payment_type) {
      conditions.push(`payment_type = '${query.payment_type}'`);
    }
    if (query.min_distance) {
      conditions.push(`trip_distance >= ${query.min_distance}`);
    }
    if (query.max_distance) {
      conditions.push(`trip_distance <= ${query.max_distance}`);
    }
    if (query.min_fare) {
      conditions.push(`fare_amount >= ${query.min_fare}`);
    }
    if (query.max_fare) {
      conditions.push(`fare_amount <= ${query.max_fare}`);
    }
    const whereClause = conditions.length
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    return await this.repository.query(`
            SELECT id, pickup_datetime, trip_distance, pickup_location, dropoff_location, payment_type, fare_amount
            FROM trips 
            WHERE ST_DWithin(pickup_location::geometry, ST_SetSRID(ST_MakePoint(${query.longitude}, ${query.latitude}), 4326)::geography, ${query.radius}) ${whereClause};
        `);
  }

  async findClusters(query: GetAllDTO) {
    const conditions: string[] = [];

    if (query.start_date) {
      conditions.push(`pickup_time >= '${query.start_date.toISOString()}'`);
    }
    if (query.end_date) {
      conditions.push(`pickup_time <= '${query.end_date.toISOString()}'`);
    }
    if (query.payment_type) {
      conditions.push(`payment_type = '${query.payment_type}'`);
    }
    if (query.min_distance) {
      conditions.push(`distance >= ${query.min_distance}`);
    }
    if (query.max_distance) {
      conditions.push(`distance <= ${query.max_distance}`);
    }
    if (query.min_fare) {
      conditions.push(`fare >= ${query.min_fare}`);
    }
    if (query.max_fare) {
      conditions.push(`fare <= ${query.max_fare}`);
    }
    const whereClause = conditions.length
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    return await this.repository.query(`
            WITH center_points AS
            (
                SELECT id, St_centroid(St_collect(St_transform(pickup_location::geometry, 4326), St_transform(dropoff_location::geometry, 4326))) AS center_point
                FROM trips ${whereClause} GROUP BY id 
            ),
            clusters AS
            (
                SELECT St_clusterdbscan(center_point::geometry, eps := 500, minpoints := 2) OVER() AS cluster_id, center_point
                FROM center_points 
            )
            SELECT cluster_id, 
                   json_build_object( 'type', 'Point', 'coordinates', json_build_array( ST_X(St_centroid(St_collect(center_point::geometry))), ST_Y(St_centroid(St_collect(center_point::geometry))) ) ) AS cluster_center,
                   St_maxdistance(St_centroid(St_collect(center_point::geometry)), St_collect(center_point::geometry)) AS cluster_radius, 
                   Count(center_point)::integer AS total_center_points
            FROM clusters 
            GROUP BY cluster_id
            HAVING ST_DWithin(St_centroid(St_collect(center_point::geometry)), ST_SetSRID(ST_MakePoint(${query.longitude}, ${query.latitude}), 4326)::geometry, ${query.radius});
        `);
  }

  async findPaymentTypes() {
    return await this.repository
      .createQueryBuilder('trip')
      .select('trip.payment_type AS payment_type')
      .groupBy('trip.payment_type')
      .getRawMany();
  }
}
