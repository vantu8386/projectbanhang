import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entity/size.entity';
import { Equal, Repository } from 'typeorm';
import { CreateSizeDTO } from './DTO/createSize.dto';
import { ProductsService } from '../products/products.services';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size) private sizeRepository: Repository<Size>,
    private readonly productService: ProductsService,
  ) {}

  async getAllSizes(): Promise<Size[]> {
    try {
      return this.sizeRepository.find();
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async getSizeByIdProduct(id: number): Promise<Size[]> {
    try {
      return this.sizeRepository.find({
        where: {
          product: Equal(id),
        },
      });
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async getSizeById(id: number): Promise<Size> {
    try {
      return this.sizeRepository.findOne({
        where: {idSize: id},
      });
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async createSize(size: CreateSizeDTO): Promise<Size> {
    try {
      // Lấy id của sản phẩm
      const { idProduct, sizeName, ...rest } = size;
      const productId = await this.productService.getById(idProduct);

      // Kiểm tra xem size đã tồn tại cho sản phẩm chưa
      const existingSize = await this.sizeRepository.findOne({
        where: { product: productId, sizeName },
      });

      if (existingSize) {
        // Nếu size đã tồn tại, bạn có thể xử lý theo ý của mình,
        // ví dụ: throw một lỗi hoặc thông báo lỗi
        throw new HttpException(
          'Size đã tồn tại cho sản phẩm này',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Nếu size chưa tồn tại, thêm mới size
      const newSize = {
        sizeName,
        product: productId,
        ...rest,
      };

      const data = this.sizeRepository.create(newSize);
      return this.sizeRepository.save(data);
    } catch (error) {
      console.log('errors:', error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
