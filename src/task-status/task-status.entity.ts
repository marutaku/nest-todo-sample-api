import { Field, GraphQLTimestamp, ID, ObjectType } from '@nestjs/graphql';
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
@ObjectType()
export class TaskStatus {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  @Field(() => Board)
  board: Board;

  @OneToMany(() => Task, (task) => task.status)
  @Field(() => [Task])
  tasks: Task[];

  @Column()
  @Field()
  order: number;

  @CreateDateColumn()
  @Field(() => GraphQLTimestamp)
  readonly createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLTimestamp)
  readonly updatedAt: Date;
}
