import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from '../boards/board.entity';
import { Task } from '../task/task.entity';

@Entity()
@Unique(['board', 'order'])
export class TaskStatus {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board: Board;

  @OneToMany(() => Task, (task) => task.status)
  tasks: Task[];

  @Column()
  order: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
