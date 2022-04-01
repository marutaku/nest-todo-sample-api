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
  @Field((type) => ID)
  readonly id: number;

  @Column()
  @Field()
  name: string;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  @Field((type) => Board)
  board: Board;

  @OneToMany(() => Task, (task) => task.status)
  @Field((type) => [Task])
  tasks: Task[];

  @Column()
  @Field()
  order: number;

  @CreateDateColumn()
  @Field((type) => GraphQLTimestamp)
  readonly createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => GraphQLTimestamp)
  readonly updatedAt: Date;
}
