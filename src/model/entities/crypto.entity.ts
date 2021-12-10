import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'float' })
  percentage: number;

  @Column({ type: 'boolean' })
  isIncrease: boolean;

  @Column({ type: 'varchar', length: 300 })
  symbol: string;
}
