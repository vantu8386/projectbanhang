import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.services';
import { CreateProduct } from './DTO/createProduct.dto';
import { CreateMediaDto } from '../media/DTO/createMedia.dto';

@Controller('/api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  createProduct(@Body() product: CreateProduct) {
    return this.productService.createProduct(product);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }
 


  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(Number(id));
  }

  @Get('/colection/:id')
  getProductByIdColection(@Param('id') id: string) {
    return this.productService.getProductById(Number(id));
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(Number(id));
  }
}
