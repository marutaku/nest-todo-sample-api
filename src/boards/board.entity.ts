import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Project } from '../projects/project.entity';
import { TaskStatus } from '../task-status/task-status.entity';

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

  @ManyToOne(() => Project, (project) => project.boards, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @OneToMany(() => TaskStatus, (taskStatus) => taskStatus.board)
  taskStatus: TaskStatus[];

  @CreateDateColumn()
  readonly createdAt?: Timestamp;

  @UpdateDateColumn()
  readonly updatedAt?: Timestamp;
}
