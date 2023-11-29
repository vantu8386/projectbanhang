import { Categoryed } from 'src/modules/categoryed/entity/categoryed.entity';
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
export class Collections {
  @PrimaryGeneratedColumn()
  idCollections: number;

  @Column()
  collectionsName: string;

  @OneToMany(() => Products, product => product.collection)
  products: Products[];

  @ManyToOne(() => Categoryed, (collections) => collections.categoryed, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'idCategoryed' })
  idCategoryed: Categoryed;

}
