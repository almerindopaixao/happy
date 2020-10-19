import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class UsersModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'token' })
  passwordResetToken: string;

  @Column({ default: new Date() })
  passwordResetExpires: Date;
}
