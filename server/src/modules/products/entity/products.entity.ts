import { Cart } from 'src/modules/cart/entity/cart.entity';
import { Collections } from 'src/modules/collections/entity/collections.entity';
import { Media } from 'src/modules/media/entity/media.entity';
import { Size } from 'src/modules/size/entity/size.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  idProduct: number;

  @Column()
  productName: string;

  @Column({
    type: 'double',
    default: 0,
    nullable: true,
  })
  salePrice: number | null;

  @Column()
  description: string;

  @Column({
    type: 'longtext',
  })
  productImage: string;

  @OneToMany(() => Media, (media) => media.idProduct)
  media: Media[];

  @OneToMany(() => Size, (size) => size.product)
  size: Size[];

  @ManyToOne(() => Collections, (collection) => collection.products, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'idCollections',
  })
  collection: Collections;
}
