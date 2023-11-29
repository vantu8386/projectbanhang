import { SizeService } from './../size/size.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { DeepPartial, Equal, Repository } from 'typeorm';
import { CreateCartDTO, UpdateCartDTO } from './DTO/createCart.dto';
import { UsersService } from '../users/users.services';
import { Size } from '../size/entity/size.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private readonly userService: UsersService,
    private readonly sizeService: SizeService,
  ) {}

  async getAllcart(): Promise<Cart[]> {
    try {
      return await this.cartRepository.find({
        relations: ['idUsers', 'size', 'size.product'],
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getOneByidCart(id: number): Promise<Cart> {
    try {
      return await this.cartRepository.findOne({
        where: { idCart: id },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getByIdcart(id: number): Promise<Cart[]> {
    try {
      return await this.cartRepository.find({
        where: { idCart: id },
        relations: ['idUsers', 'size', 'size.product'],
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getCartIdUser(id: number): Promise<Cart[]> {
    try {
      return await this.cartRepository.find({
        where: { idUsers: Equal(id) },
        relations: ['idUsers', 'size', 'size.product'],
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createCart(cart: CreateCartDTO): Promise<Cart> {
    try {
      const { idUsers, idSize, ...reset } = cart;
      const userId = await this.userService.getById(idUsers);
      console.log('userId:', userId);
      const sizeId = await this.sizeService.getSizeById(idSize);
      console.log('sizeId:', sizeId);
      if (!userId || !sizeId) {
        throw new HttpException(
          'User or Size not found',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newCart = {
        ...reset,
        idUsers: userId,
        size: sizeId,
      };
      console.log('newCart:', newCart);
      const data = this.cartRepository.create(newCart);
      return this.cartRepository.save(data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateCart(ids: number[], quantities: number[]): Promise<void> {
    try {
      for (let i = 0; i < ids.length; i++) {
        await this.cartRepository
          .createQueryBuilder()
          .update(Cart)
          .set({ quantity: quantities[i] })
          .where('idCart = :id', { id: ids[i] })
          .execute();
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteCart(idCart: number): Promise<any> {
    try {
      return await this.cartRepository.delete(idCart);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
