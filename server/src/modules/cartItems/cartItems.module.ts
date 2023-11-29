import { Module } from '@nestjs/common';
import { CartItemsService } from './cartItems.service';
import { CartItemsController } from './cartItems.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItems } from './entity/cartItems.entity';

import { Products } from '../products/entity/products.entity';
import { Users } from '../users/entity/users.emtity';
import { ProductModule } from '../products/products.module';

import { UsersModule } from '../users/users.module';
import { Cart } from '../cart/entity/cart.entity';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItems, Cart, Products, Users]),
    ProductModule,
    CartModule,
    UsersModule,
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
