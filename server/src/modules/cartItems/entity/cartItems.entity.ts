import { Cart } from 'src/modules/cart/entity/cart.entity';
import { Users } from 'src/modules/users/entity/users.emtity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum CartItemsStatus {
    ADMIN = 'Xác Nhận',
    USER = 'Chưa Xác Nhận',
  }

@Entity()
export class CartItems {
  @PrimaryGeneratedColumn()
  idCartItem: number;

  @ManyToOne(() => Users, (users) => users.order, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'idUsers',
  })
  idUsers: Users;

  @ManyToOne(() => Cart, (cart) => cart.cartItems, {
    nullable: false,  
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'idCart',
  })
  cart: Cart;


  @Column({
    type: 'enum',
    enum: CartItemsStatus,
    default: CartItemsStatus.USER,
    nullable: false,
  })
  status: CartItemsStatus;
}
