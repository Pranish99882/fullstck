// src/entities/Role.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from './Permission';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Permission, { cascade:true, onDelete: 'CASCADE' })
  @JoinTable()
  permissions: Permission[];
}
