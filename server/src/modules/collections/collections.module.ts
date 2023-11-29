import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collections } from './entity/collections.entity';
import { CollectionsController } from './collections.controller';
import { CategoryedModule } from '../categoryed/categoryed.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collections]), CategoryedModule],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [CollectionsService]
})
export class CollectionsModule {}
