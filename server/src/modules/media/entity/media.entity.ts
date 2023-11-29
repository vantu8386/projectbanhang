import { Products } from 'src/modules/products/entity/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  idMedia: number;

  @Column({
    default: 'image',
  })
  type: string;
  
  @Column({
    type: "longtext"
  })
  urlImage: string;

  @ManyToOne(() => Products, (product) => product.media, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'idProduct',
  })
  idProduct: Products;
}
