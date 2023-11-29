import { Module } from '@nestjs/common';
import { CategoryedController } from './categoryed.controller';
import { CategoryedService } from './categoryed.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoryed } from './entity/categoryed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoryed])],
  controllers: [CategoryedController],
  providers: [CategoryedService],
  exports: [CategoryedService]
})
export class CategoryedModule {}
