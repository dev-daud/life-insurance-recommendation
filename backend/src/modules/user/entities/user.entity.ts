import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Recommendation } from '../../recommendation/entities/recommendation.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'int' })
  income: number;

  @Column({ type: 'int' })
  dependents: number;

  @Column({ type: 'varchar', length: 10 })
  riskTolerance: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Recommendation, (recommendation) => recommendation.user)
  recommendations: Recommendation[];
} 
