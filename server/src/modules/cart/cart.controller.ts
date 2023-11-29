import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDTO, UpdateCartDTO } from './DTO/createCart.dto';

@Controller('/api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getAllcart() {
    return this.cartService.getAllcart();
  }

  @Get('/user/:id')
  getCartIdUser(@Param('id') id: string) {
    return this.cartService.getCartIdUser(Number(id));
  }

  @Get('/:id')
  getByIdcart(@Param('id') id: string) {
    return this.cartService.getByIdcart(Number(id));
  }

  @Post()
  createCart(@Body() cart: CreateCartDTO) {
    return this.cartService.createCart(cart);
  }

  @Patch()
  async updateMultipleCarts(@Body() payload: { carts: any[] }) {
    const { carts } = payload;

    if (!Array.isArray(carts)) {
      console.error('Invalid format: "carts" should be an array.');
      return;
    }

    const ids = carts.map((cart) => cart.idCart);
    const quantities = carts.map((cart) => cart.quantity);

    await this.cartService.updateCart(ids, quantities);
  }

  @Delete('/:idCart')
  deleteCart(@Param('idCart') idCart: string) {
    return this.cartService.deleteCart(Number(idCart));
  }
}
