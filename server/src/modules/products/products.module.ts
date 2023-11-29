import { CollectionsModule } from './../collections/collections.module';
import { Module } from '@nestjs/common';
import { ProductController } from './products.contollers';
import { ProductsService } from './products.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entity/products.entity';
import { Collections } from '../collections/entity/collections.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Collections]), CollectionsModule],
  controllers: [ProductController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductModule {}
