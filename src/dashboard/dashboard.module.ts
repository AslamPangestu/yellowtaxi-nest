import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Trip } from 'src/trips/trips.entity';

import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Trip])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
