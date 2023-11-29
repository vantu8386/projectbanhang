import { Cart } from 'src/modules/cart/entity/cart.entity';
import { Users } from 'src/modules/users/entity/users.emtity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  idOrder: number;

  @ManyToOne(() => Users, (users) => users.order, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'idUsers',
  })
  idUsers: Users;


  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  userName: string;
  @Column({
    type: 'int',
    nullable: false,
  })
  phone: number;

  @Column()
  address: string;

  @Column({
    type: 'text',
  })
  activeDistrict: string;
  @Column({
    type: 'text',
  })
  activeProvince: string;

  @Column({
    type: 'text',
  })
  activeWard: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  OrderDate: string;
}
