import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';

export interface Percentage {
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
}

@Entity({ name: 'crypto' })
export class Crypto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: true })
  cmc_rank: number;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  icon_url: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  symbol: string;

  @Column({ type: 'float', nullable: true })
  current_price: number;

  @Column({ type: 'float', array: true, nullable: true })
  past_price: number[];

  @Column({ type: 'varchar', nullable: true })
  percentage: string;

  @Column({ type: 'boolean', nullable: true })
  isIncrease: boolean;

  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column('json', { nullable: true })
  percentages: Percentage;

  @ManyToMany(() => User, (user: User) => user.bookmarkedCryptos)
  public users: User[];
}
