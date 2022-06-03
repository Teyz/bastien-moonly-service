import { Crypto } from 'src/model/entities/crypto.entity';
import { User } from 'src/model/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'user-alerte' })
export class UserAlerte extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Crypto)
  @JoinColumn({ name: 'cryptoId' })
  crypto: Crypto;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int', nullable: true })
  lower_price: number;

  @Column({ type: 'int', nullable: true })
  upper_price: number;
}
