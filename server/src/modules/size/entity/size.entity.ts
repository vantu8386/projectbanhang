import { Cart } from 'src/modules/cart/entity/cart.entity';
import { CartItems } from 'src/modules/cartItems/entity/cartItems.entity';
import { Products } from 'src/modules/products/entity/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  idSize: number;

  @Column({
    type: 'varchar',
    length: 10,
  })
  sizeName: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Products, (product) => product.size, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'idProduct',
  })
  product: Products;

  @OneToMany(() => Cart, (cart) => cart.size)
  cart: Cart[];
}
