import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardModule } from './dashboard/dashboard.module';
import { TripsModule } from './trips/trips.module';
import { Trip } from './trips/trips.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Trip],
        synchronize: true,
      }),
    }),
    DashboardModule,
    TripsModule,
  ],
  providers: [
    { provide: 'APP_PIPE', useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule { }
