import { Order } from 'src/modules/order/entity/order.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum StatusIscheck {
  ACTIVE = '0',
  BLOCKED = '1',
}

@Entity()
@Unique(['email'])
export class Users {
  @PrimaryGeneratedColumn()
  idUsers: number;
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
  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  passwords: string;
  @Column({
    type: 'varchar',
    default:
      'https://res.cloudinary.com/dtkmmptqm/image/upload/v1700197385/avata_user/dzvhwijayvfz1sjwbxtm.png',
    nullable: true,
  })
  avatarUrl: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  role: UserRole;

  @Column({
    type: 'tinyint',
    enum: StatusIscheck,
    default: StatusIscheck.ACTIVE,
    nullable: false,
  })
  isBlocked: boolean;

  @OneToMany(() => Order, (order) => order.idUsers)
  order: Order[];

}
