import { Board } from '../../src/boards/board.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { TaskStatus } from '../task-status/task-status.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board, (board) => board.taskStatus, { onDelete: 'CASCADE' })
  board: Board;

  @Column({
    length: 24,
    nullable: false,
  })
  title: string;

  @Column({ default: null })
  description: string;

  @Column('date', { default: null })
  deadline: Date | null = null;

  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.tasks)
  status: TaskStatus;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
