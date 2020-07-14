import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import CreateOfficeDto from './dto/createOffice.dto';
import UpdateOfficeDto from './dto/updateOffice.dto';
import OfficesService from './offices.service';

@Controller('offices')
export default class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @Get()
  getAllOffices() {
    return this.officesService.getAllOffices();
  }

  @Get(':id')
  getOfficeById(@Param('id') id: string) {
    return 'get by id';
  }

  @Post()
  createOffice(@Body() office: CreateOfficeDto) {
    return 'asd';
  }

  @Put(':id')
  modifyOffice(@Param('id') id: string, @Body() Office: UpdateOfficeDto) {
    return 'asd';
  }

  @Delete(':id')
  deleteOffice(@Param('id') id: string) {
    return 'asd';
  }

  @Delete()
  deleteAllOffices() {}
}
