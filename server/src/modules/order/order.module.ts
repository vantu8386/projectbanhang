import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entity/order.entity";
import { Users } from "../users/entity/users.emtity";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [TypeOrmModule.forFeature([Order, Users]), UsersModule],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}