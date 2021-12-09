import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'crypto' })
export class Crypto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;
}
