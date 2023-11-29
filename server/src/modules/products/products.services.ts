import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entity/products.entity';
import { Repository } from 'typeorm';
import { CreateProduct } from './DTO/createProduct.dto';
import { CollectionsService } from '../collections/collections.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    private readonly collectionService: CollectionsService,
  ) {}

  async createProduct(product: CreateProduct): Promise<Products> {
    try {
      const { idCollections, ...rest } = product;
      const colectionById =
        await this.collectionService.getByIdCollection(idCollections);
      const newProduct = {
        ...rest,
        collection: colectionById,
      };
      const data = this.productRepository.create(newProduct);
      return this.productRepository.save(data);
    } catch (error) {
      console.log('error-create-product:', error);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllProducts(): Promise<Products[]> {
    try {
      const product =  await this.productRepository.find({
        relations: ['media', 'media.idProduct', 'size'],
      });
      return product.reverse();
    } catch (error) {
      console.error('error-get-all:', error);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async getById(id: number): Promise<Products> {
    return await this.productRepository.findOne({
      where: { idProduct: id },
    });
  }

  async getProductByIdColection(id: number): Promise<Products[]> {
    try {
      return await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.size', 'size')
        .leftJoinAndSelect('product.media', 'media')
        .where('product.idCollection = :id', { id })
        .getMany();
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async getProductById(id: number): Promise<Products[]> {
    try {
      return await this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.size', 'size')
        .leftJoinAndSelect('product.media', 'media')
        // .where('product.idCollections = :id', { id })
        .where({ idProduct: id })
        .getMany();
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProduct(id: number): Promise<any> {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
