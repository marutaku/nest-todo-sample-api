import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToOne,
} from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Project, (project) => project.boards)
  project: Project;

  @CreateDateColumn()
  readonly createdAt?: Timestamp;

  @UpdateDateColumn()
  readonly updatedAt?: Timestamp;
}
