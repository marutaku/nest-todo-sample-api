import { Field, GraphQLTimestamp, ID, ObjectType } from '@nestjs/graphql';
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
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({
    length: 100,
  })
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field()
  description: string;

  @ManyToOne(() => Project, (project) => project.boards, {
    onDelete: 'CASCADE',
  })
  @Field(() => Project)
  project: Project;

  @OneToMany(() => TaskStatus, (taskStatus) => taskStatus.board)
  @Field(() => [TaskStatus])
  taskStatus: TaskStatus[];

  @CreateDateColumn()
  @Field(() => GraphQLTimestamp)
  readonly createdAt?: Timestamp;

  @UpdateDateColumn()
  @Field(() => GraphQLTimestamp)
  readonly updatedAt?: Timestamp;
}
