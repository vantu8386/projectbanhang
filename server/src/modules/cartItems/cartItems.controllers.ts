import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartItemsService } from './cartItems.service';
import { CreateCartItemsDTO } from './DTO/createCartItems.dto';

@Controller('/api/v1/cart-items')
export class CartItemsController {
  constructor(private readonly cartItemService: CartItemsService) {}

  @Get()
  getAllCartItems(){
    return this.cartItemService.getAllCartItems()
  }

  @Get("/:id")
  getCartItemsUsers(@Param("id") id: string) {
    return this.cartItemService.getCartItemsUsers(Number(id));
  }

  @Post()
  createCartItems(@Body() cartItems: CreateCartItemsDTO[]) {
    return this.cartItemService.createCartItems(cartItems);
  }
}
