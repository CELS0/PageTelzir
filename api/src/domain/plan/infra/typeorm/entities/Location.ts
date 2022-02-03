import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('locations')
class Location {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  origin: string;

  @Column()
  destiny: string;

  @Column()
  pricing: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export { Location };
