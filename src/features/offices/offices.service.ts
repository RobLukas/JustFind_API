import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateCompanyDto from './dto/createOffice.dto';
import UpdateCompanyDto from './dto/updateOffice.dto';
import Offices from './offices.entity';

@Injectable()
export default class OfficesService {
  constructor(
    @InjectRepository(Offices)
    private officesRepository: Repository<Offices>,
  ) {}
  getAllOffices() {
    return this.officesRepository.find();
  }
}
