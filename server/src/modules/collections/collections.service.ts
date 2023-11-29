import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collections } from './entity/collections.entity';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collections)
    private collectionsRepository: Repository<Collections>,
  ) {}

  async getCollection(): Promise<Collections[]> {
    try {
      return this.collectionsRepository.find({
        relations: ['idCategoryed'],
      });
    } catch (error) {
      // console.log("error:", error)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  //tạo ra get one


  async getByIdCollection(id: number): Promise<Collections> {
    try {
      return await this.collectionsRepository.findOne({
        where: { idCollections: id },
        relations: ['idCategoryed'],
      });
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllCollectionsWithIdCategory(id: number): Promise<Collections[]> {
    
    try {
      return await this.collectionsRepository.find({
        where: {
          idCategoryed: Equal(id),
        },
      });
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
