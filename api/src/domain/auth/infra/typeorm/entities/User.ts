import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './Profile';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  hashPassword: string;

  @Column()
  isAdmin?: boolean;

  @JoinColumn({ name: 'profile_id' })
  @OneToOne(() => Profile, profile => profile.id)
  profile?: Profile;

  @Column({ name: 'profile_id' })
  profileId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export { User };
