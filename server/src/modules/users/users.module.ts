import { Module } from "@nestjs/common";
import { UsersController } from "./users.controllers";
import { UsersService } from "./users.services";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./entity/users.emtity";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}