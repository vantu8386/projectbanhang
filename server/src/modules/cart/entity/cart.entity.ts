import { CartItems } from 'src/modules/cartItems/entity/cartItems.entity';
import { Order } from 'src/modules/order/entity/order.entity';
import { Products } from 'src/modules/products/entity/products.entity';
import { Size } from 'src/modules/size/entity/size.entity';
import { Users } from 'src/modules/users/entity/users.emtity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  idCart: number;

  @ManyToOne(() => Users, (users) => users.order, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'idUsers',
  })
  idUsers: Users;

  @ManyToOne(() => Size, (size) => size.cart, {
    nullable: false,  
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'idSize',
  })
  size: Size;

  @OneToMany(() => CartItems, cartItems => cartItems.cart)
  cartItems: CartItems[]

  @Column()
  quantity: number;
}
