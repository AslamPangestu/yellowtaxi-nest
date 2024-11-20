import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Point } from 'geojson';

@Entity({ name: 'trips' })
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 3 })
  vendor_id: string;

  @Column({ type: 'timestamptz' })
  pickup_datetime: Date;

  @Column({ type: 'timestamptz' })
  dropoff_datetime: Date;

  @Column({ type: 'int' })
  passenger_count: number;

  @Column({ type: 'float8' })
  trip_distance: number;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326 })
  pickup_location: Point;

  @Column({ type: 'char', length: 1, nullable: true })
  store_and_fwd_flag?: string;

  @Column({ type: 'geography', spatialFeatureType: 'Point', srid: 4326 })
  dropoff_location: Point;

  @Column({ type: 'char', length: 3 })
  payment_type: string;

  @Column({ type: 'float8' })
  fare_amount: number;

  @Column({ type: 'float8' })
  mta_tax: number;

  @Column({ type: 'float8' })
  tip_amount: number;

  @Column({ type: 'float8' })
  tolls_amount: number;

  @Column({ type: 'float8' })
  total_amount: number;

  @Column({ type: 'float8' })
  imp_surcharge: number;

  @Column({ type: 'int' })
  rate_code: number;
}
