import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import OffersModule from 'offers/offers.module';
import { DatabaseModule } from 'database/database.module';
import validationSchema from 'utils/envalid';
import CompaniesModule from 'companies/companies.module';
import OfficesModule from 'offices/offices.module';

@Module({
  imports: [
    ConfigModule.forRoot(validationSchema),
    DatabaseModule,
    OffersModule,
    CompaniesModule,
    OfficesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
