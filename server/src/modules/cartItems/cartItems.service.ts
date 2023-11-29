import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { CartItems } from './entity/cartItems.entity';
import { UsersService } from '../users/users.services';
import { CreateCartItemsDTO } from './DTO/createCartItems.dto';
import { CartService } from '../cart/cart.service';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItems)
    private cartRepository: Repository<CartItems>,
    private readonly userService: UsersService,
    private readonly cartService: CartService,
  ) {}

  async getAllCartItems(): Promise<CartItems[]> {
    return this.cartRepository
    .createQueryBuilder('cartItems')
    .leftJoinAndSelect('cartItems.idUsers', 'users') 
    .leftJoinAndSelect('cartItems.cart', 'cart')
    .leftJoinAndSelect('cart.size', 'size') 
    .leftJoinAndSelect('size.product', 'product') 
    .getMany();
  }

  async getCartItemsUsers(idUser: number): Promise<CartItems[]> {
    try {
      return this.cartRepository

        .createQueryBuilder('cartItems')
        .leftJoinAndSelect('cartItems.idUsers', 'users') 
        .leftJoinAndSelect('cartItems.cart', 'cart')
        .leftJoinAndSelect('cart.size', 'size') 
        .leftJoinAndSelect('size.product', 'product') 
        .where('cartItems.idUsers = :idUser', { idUser })
        .getMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createCartItems(cartItems: CreateCartItemsDTO[]): Promise<CartItems[]> {
    try {
      const createdCartItems: CartItems[] = [];

      for (const cartItem of cartItems) {
        const { idUsers, idCart, ...reset } = cartItem;

        const userId = await this.userService.getById(idUsers);

        const cartsId = await this.cartService.getOneByidCart(idCart);

        if (!userId || !cartsId) {
          throw new HttpException(
            'User or Size not found',
            HttpStatus.BAD_REQUEST,
          );
        }

        const newCartItem = {
          ...reset,
          idUsers: userId,
          cart: cartsId,
        };
        console.log('newCartItem:', newCartItem);

        const data = this.cartRepository.create(newCartItem);
        const createdCartItem = await this.cartRepository.save(data);
        createdCartItems.push(createdCartItem);
      }

      return createdCartItems;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
