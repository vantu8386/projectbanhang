import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './entity/media.entity';
import { Repository } from 'typeorm';
import { CreateMediaDto } from './DTO/createMedia.dto';
import { ProductsService } from '../products/products.services';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly productService: ProductsService
  ) {}

  // async createMedia(image: CreateMediaDto): Promise<Media> {
  //   try {
  //     const {idProduct, ...reset} = image;
  //     const productById = await this.productService.getById(idProduct)
  //     const newMedia = {
  //       ...reset, idProduct: productById
  //     }
  //     const data = this.mediaRepository.create(newMedia);
  //     return this.mediaRepository.save(data);
  //   } catch (error) {
  //     console.log('error:', error);
  //     throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  //   }
  // }

  async createMedia(images: CreateMediaDto): Promise<Media[]> {
    try {
      const { idProduct, urlImage } = images;
      
      // Chắc chắn rằng urlImage là một mảng
      if (!Array.isArray(urlImage)) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }

      const productById = await this.productService.getById(idProduct);

      // Tạo mảng các đối tượng mới
      const newMediaArray = urlImage.map((imageUrl) => ({
        idProduct: productById,
        urlImage: imageUrl,
      }));  

      const data = this.mediaRepository.create(newMediaArray);
      return this.mediaRepository.save(data);
    } catch (error) {
      console.log('error:', error);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
  
  
}
