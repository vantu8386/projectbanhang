
import { Collections } from 'src/modules/collections/entity/collections.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["categoryName"])
export class Categoryed {
  @PrimaryGeneratedColumn()
  idCategoryed: number;

  @Column({
    type: 'varchar',
    length: 45,
  })
  categoryName: string;

  @OneToMany(() => Collections, categoryes => categoryes.idCategoryed)
  categoryed: Collections[];

}
