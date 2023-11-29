import { Controller, Param, Get, Post, Body, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './DTO/createOrder.dto';

@Controller('/api/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() order: CreateOrderDTO) {
    return this.orderService.createOrder(order)
  }

//   @Get('/:idUser')
//   getIdOrderUser(@Param('idUser') idUser: string) {
//     // return this;
//   }

  @Delete("/:idOrder")
  deleteOrder(@Param('idOrder') idOrder: string) {
    return this.orderService.deleteOrder(Number(idOrder))
  }
}
