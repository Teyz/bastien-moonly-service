import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Crypto } from './crypto.entity';
import { UserAlerte } from 'src/user-alerte/entities/user-alerte.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  refreshtoken: string;

  @Column({ nullable: true })
  refreshtokenexpires: string;

  @Column({ nullable: true })
  fcmToken: string;

  @ManyToMany(() => Crypto, (crypto: Crypto) => crypto.users)
  @JoinTable()
  public bookmarkedCryptos: Crypto[];

  @OneToMany(() => UserAlerte, (userAlerte: UserAlerte) => userAlerte)
  @JoinTable()
  public userAlerts: UserAlerte[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
