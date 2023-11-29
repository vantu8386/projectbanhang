import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './DTO/createOrder.dto';
import { UsersService } from '../users/users.services';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private readonly userService: UsersService,
  ) {}

  async createOrder(order: CreateOrderDTO): Promise<Order> {
    try {
      const { idUsers, ...reset } = order;
      const userId = await this.userService.getById(idUsers);
      const newOrder = {
        ...reset,
        idUsers: userId,
      };
      const data = this.orderRepository.create(newOrder);
      return await this.orderRepository.save(data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteOrder(idOrder: number): Promise<any> {
    try {
      return await this.orderRepository.delete(idOrder);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
