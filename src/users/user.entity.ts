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
  @Field((type) => ID)
  id: string;

  @Column()
  @Field((type) => String)
  name: string;

  @Column({ select: false })
  password: string;

  @ManyToMany(() => Project, (project) => project.users)
  @Field((type) => [Project])
  projects: Project[];

  @CreateDateColumn()
  @Field((type) => GraphQLTimestamp)
  readonly createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => GraphQLTimestamp)
  readonly updatedAt: Date;
}
