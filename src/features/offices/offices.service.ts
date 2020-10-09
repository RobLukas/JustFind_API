import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Offices from './offices.entity';
import QueryOfficeDto from './dto/queryOffice.dto';
import OfficeNotFound from './exceptions/OfficeNotFound.exceptions';
import CreateOfficeDto from './dto/createOffice.dto';
import OfficeAlreadyExists from './exceptions/OfficeAlreadyExists.exceptions';
import UpdateOfficeDto from './dto/updateOffice.dto';
import GeoCodeApiService from '../geoCodeApi/geoCodeApi.service';
import OfficeNothingHasChanged from './exceptions/OfficeNothingHasChanged.exception';
import GetAllDataResponse from 'utils/dto/getAllDataResponse.dto';

@Injectable()
export default class OfficesService {
  constructor(
    @InjectRepository(Offices)
    private readonly officesRepository: Repository<Offices>,
    private readonly geoCodeApiService: GeoCodeApiService,
  ) {}
  async getAllOffices(
    query: QueryOfficeDto,
  ): Promise<GetAllDataResponse<Offices>> {
    const { limit, offset, ...entities } = query;
    const [offices, count] = await this.officesRepository.findAndCount({
      where: entities,
      take: limit,
      skip: offset,
    });

    return {
      count,
      limit,
      offset,
      data: offices,
    };
  }

  async getOfficeById(id: string) {
    const office = await this.officesRepository.findOne(id, {
      relations: ['company'],
    });
    if (!office) {
      throw new OfficeNotFound(id);
    }
    return office;
  }

  async createOffice(office: CreateOfficeDto) {
    const officeExists = await this.officesRepository.findOne(office);
    if (officeExists) {
      throw new OfficeAlreadyExists();
    }
    const geoPosition = await this.geoCodeApiService.getLatLongByAddress(
      office,
    );
    const newOffice = this.officesRepository.create({
      ...office,
      geoPosition,
    });
    const createdOffice = await this.officesRepository.save(newOffice);
    return createdOffice;
  }

  async updateOffice(id: string, updateOffice: UpdateOfficeDto) {
    const office = await this.officesRepository.findOne(id);
    if (!office) {
      throw new OfficeNotFound(id);
    }
    if (!Object.keys(updateOffice).length) {
      throw new OfficeNothingHasChanged();
    }
    const geoPosition = await this.geoCodeApiService.getLatLongByAddress({
      ...office,
      ...updateOffice,
    });

    const newOffice = this.officesRepository.create({
      ...office,
      ...updateOffice,
      geoPosition,
    });

    const updatedOffice = await this.officesRepository.save(newOffice);
    return updatedOffice;
  }

  async deleteOfficeById(id: string) {
    const deleteResponse = await this.officesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new OfficeNotFound(id);
    }
    return 'Office deleted';
  }
}
