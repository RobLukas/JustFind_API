import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Offices from './offices.entity';
import QueryOfficeDto from './dto/queryOffice.dto';
import OfficeNotFound from './exceptions/OfficeNotFound.exceptions';
import CreateOfficeDto from './dto/createOffice.dto';
import OfficeAlreadyExists from './exceptions/OfficeAlreadyExists.exceptions';
import UpdateOfficeDto from './dto/updateOffice.dto';
import GeoCodeApiService from './geoCodeApi.service';
import OfficeNothingHasChanged from './exceptions/OfficeNothingHasChanged.exception';

@Injectable()
export default class OfficesService {
  constructor(
    private geoCodeApiService: GeoCodeApiService,
    @InjectRepository(Offices)
    private officesRepository: Repository<Offices>,
  ) {}
  async getAllOffices(query: QueryOfficeDto) {
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
    if (office) {
      return office;
    }
    throw new OfficeNotFound(id);
  }

  async createOffice(office: CreateOfficeDto) {
    const officeExists = await this.officesRepository.findOne(office);
    if (officeExists) {
      throw new OfficeAlreadyExists();
    }
    const geoPosition = await this.geoCodeApiService.getLatLongByAddress(
      office,
    );
    const newOffice = await this.officesRepository.create({
      ...office,
      geoPosition,
    });
    await this.officesRepository.save(newOffice);
    return newOffice;
  }

  async updateOffice(id: string, office: UpdateOfficeDto) {
    const getOffice = await this.officesRepository.findOne(id);
    if (!getOffice) {
      throw new OfficeNotFound(id);
    }
    if (!Object.keys(office).length) {
      throw new OfficeNothingHasChanged();
    }
    const geoPosition = await this.geoCodeApiService.getLatLongByAddress({
      ...getOffice,
      ...office,
    });
    const updatedOffice = await this.officesRepository.save({
      ...getOffice,
      ...office,
      geoPosition,
    });
    const finedOffice = await this.officesRepository.findOne(id);
    if (updatedOffice && finedOffice) {
      return updatedOffice;
    }
    throw new OfficeNotFound(id);
  }

  async deleteOfficeById(id: string) {
    const deleteResponse = await this.officesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new OfficeNotFound(id);
    }
    return 'Office deleted';
  }
}
