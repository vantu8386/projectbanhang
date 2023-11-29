import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { Size } from '../size/entity/size.entity';
import { Products } from '../products/entity/products.entity';
import { ProductModule } from '../products/products.module';
import { SizeModule } from '../size/size.module';
import { Users } from '../users/entity/users.emtity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Size, Products, Users]),
    ProductModule,
    SizeModule,
    UsersModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
