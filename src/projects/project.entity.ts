import { Field, ObjectType } from '@nestjs/graphql';
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
  @Field()
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
  readonly ceatedAt: Date;

  @UpdateDateColumn()
  readonly updatedat: Date;
}
