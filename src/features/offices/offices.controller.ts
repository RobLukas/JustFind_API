import {
  Controller,
  Body,
  Get,
  Post,
  Delete,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import CreateOfficeDto from './dto/createOffice.dto';
import UpdateOfficeDto from './dto/updateOffice.dto';
import OfficesService from './offices.service';
import QueryOfficeDto from './dto/queryOffice.dto';
import UUIDParams from 'utils/uuidParams';

@Controller('offices')
export default class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @Get()
  getAllOffices(@Query() query: QueryOfficeDto) {
    return this.officesService.getAllOffices(query);
  }

  @Get(':id')
  getOfficeById(@Param() { id }: UUIDParams) {
    return this.officesService.getOfficeById(id);
  }

  @Post()
  createOffice(@Body() office: CreateOfficeDto) {
    return this.officesService.createOffice(office);
  }

  @Patch(':id')
  modifyOffice(@Param() { id }: UUIDParams, @Body() office: UpdateOfficeDto) {
    return this.officesService.updateOffice(id, office);
  }

  @Delete(':id')
  deleteOffice(@Param() { id }: UUIDParams) {
    return this.officesService.deleteOfficeById(id);
  }
}
