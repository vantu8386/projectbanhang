import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDTO } from './DTO/createSize.dto';

@Controller('/api/v1/sizes')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Get()
  getAllSizes() {
    return this.sizeService.getAllSizes();
  }

  @Get('/:idProduct')
  getSizeByIdProduct(@Param('idProduct') idProduct: string) {
    return this.sizeService.getSizeByIdProduct(Number(idProduct));
  }

  @Post()
  createSize(@Body() content : CreateSizeDTO) {
    return this.sizeService.createSize(content)
  }
}