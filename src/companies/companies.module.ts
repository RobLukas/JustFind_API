import { Module } from '@nestjs/common';
import CompaniesService from './companies.service';
import CompaniesController from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Companies from './companies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Companies])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export default class CompaniesModule {}
