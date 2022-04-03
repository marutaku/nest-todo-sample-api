import { Field, GraphQLTimestamp, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ select: false })
  password: string;

  @ManyToMany(() => Project, (project) => project.users)
  @Field(() => [Project])
  projects: Project[];

  @CreateDateColumn()
  @Field(() => GraphQLTimestamp)
  readonly createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLTimestamp)
  readonly updatedAt: Date;
}
