import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { Trip } from './trips.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  providers: [TripsService],
  controllers: [TripsController],
})
export class TripsModule {}
