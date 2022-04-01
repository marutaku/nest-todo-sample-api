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
import { Field, GraphQLTimestamp, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @ManyToOne(() => Board, (board) => board.taskStatus, { onDelete: 'CASCADE' })
  @Field((type) => Board)
  board: Board;

  @Column({
    length: 24,
    nullable: false,
  })
  @Field()
  title: string;

  @Column({ default: null })
  @Field()
  description: string;

  @Column('date', { default: null })
  @Field()
  deadline: Date | null = null;

  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.tasks)
  @Field((type) => TaskStatus)
  status: TaskStatus;

  @CreateDateColumn()
  @Field((type) => GraphQLTimestamp)
  readonly createdAt?: Date;

  @UpdateDateColumn()
  @Field((type) => GraphQLTimestamp)
  readonly updatedAt?: Date;
}
