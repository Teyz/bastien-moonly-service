import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'crypto' })
export class Crypto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'float' })
  current_price!: number;

  @Column({ type: 'float', array: true })
  past_price!: number[];

  @Column({ type: 'varchar', length: 300 })
  iconUrl: string;

  @Column({ type: 'varchar', nullable: true })
  percentage: string;

  @Column({ type: 'boolean' })
  isIncrease: boolean;

  @Column({ type: 'varchar', length: 300 })
  symbol: string;

  @ManyToMany(() => User, (user: User) => user.bookmarkedCryptos)
  public users: User[];
}
