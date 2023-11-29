import { Module } from "@nestjs/common";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "./entity/media.entity";
import { ProductModule } from "../products/products.module";
import { Products } from "../products/entity/products.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Media, Products]), ProductModule],
    controllers: [MediaController],
    providers: [MediaService],
})

export class MediaModule {}