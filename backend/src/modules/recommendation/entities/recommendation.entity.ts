import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('recommendations')
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'text' })
  recommendationText: string;

  @Column({ type: 'text' })
  explanation: string;

  @Column({ type: 'int' })
  coverage: number;

  @Column({ type: 'int' })
  term: number;

  @Column({ type: 'varchar', length: 20 })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.recommendations)
  @JoinColumn({ name: 'userId' })
  user: User;
} 
