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
  @Field(() => ID)
  id: number;

  @ManyToOne(() => Board, (board) => board.taskStatus, { onDelete: 'CASCADE' })
  @Field(() => Board)
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
  @Field(() => TaskStatus)
  status: TaskStatus;

  @CreateDateColumn()
  @Field(() => GraphQLTimestamp)
  readonly createdAt?: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLTimestamp)
  readonly updatedAt?: Date;
}
