import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import OffersModule from 'offers/offers.module';
import { DatabaseModule } from 'database/database.module';

import validationSchema from 'utils/envalid';

@Module({
  imports: [
    OffersModule,
    ConfigModule.forRoot(validationSchema),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
