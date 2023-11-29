import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from './entity/size.entity';
import { Products } from '../products/entity/products.entity';
import { ProductModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Size, Products]), ProductModule],
  controllers: [SizeController],
  providers: [SizeService],
  exports: [SizeService]
})
export class SizeModule {}
