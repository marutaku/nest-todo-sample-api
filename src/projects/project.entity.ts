import { Field, GraphQLTimestamp, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from '../boards/board.entity';
import { User } from '../users/user.entity';

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  @Field((type) => [User])
  users: User[];

  @OneToMany(() => Board, (board) => board.project)
  @Field((type) => [Board])
  boards: Board[];

  @CreateDateColumn()
  @Field((type) => GraphQLTimestamp)
  readonly ceatedAt: Date;

  @UpdateDateColumn()
  @Field((type) => GraphQLTimestamp)
  readonly updatedat: Date;
}
