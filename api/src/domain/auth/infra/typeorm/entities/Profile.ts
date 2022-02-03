import { Plan } from '@domain/plan/infra/typeorm/entities/Plan';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profiles')
class Profile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  fone: string;

  @JoinColumn({ name: 'plan_id' })
  @OneToOne(() => Plan, plan => plan.id)
  plan?: Plan;

  @Column({ name: 'plan_id' })
  planId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export { Profile };
