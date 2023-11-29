import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './modules/users/entity/users.emtity';
import { UsersModule } from './modules/users/users.module';
import { Categoryed } from './modules/categoryed/entity/categoryed.entity';
import { Products } from './modules/products/entity/products.entity';
import { Media } from './modules/media/entity/media.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/products/products.module';
import { Collections } from './modules/collections/entity/collections.entity';
import { CategoryedModule } from './modules/categoryed/categoryed.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { Order } from './modules/order/entity/order.entity';
import { Size } from './modules/size/entity/size.entity';
import { Cart } from './modules/cart/entity/cart.entity';
import { MediaModule } from './modules/media/media.module';
import { SizeModule } from './modules/size/size.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { CartItemsModule } from './modules/cartItems/cartItems.module';
import { CartItems } from './modules/cartItems/entity/cartItems.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        Users,
        Categoryed,
        Collections,
        Products,
        Media,
        Size,
        Order,
        Cart,
        CartItems,
      ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    CategoryedModule,
    CollectionsModule,
    MediaModule,
    SizeModule,
    CartModule,
    OrderModule,
    CartItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
