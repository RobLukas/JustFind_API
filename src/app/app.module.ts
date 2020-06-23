import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import OffersModule from 'offers/offers.module';

import validationSchema from 'utils/envalid';

@Module({
  imports: [OffersModule, ConfigModule.forRoot(validationSchema)],
  controllers: [],
  providers: [],
})
export class AppModule {}
