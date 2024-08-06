// src/entities/Student.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './Role';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, { cascade: true , onDelete: 'CASCADE'} )
  @JoinTable()
  roles: Role[];
}
