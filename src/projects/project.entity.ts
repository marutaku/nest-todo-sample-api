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
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  users: User[];

  @OneToMany(() => Board, (board) => board.project)
  boards: Board[];

  @CreateDateColumn()
  ceatedAt: Date;

  @UpdateDateColumn()
  updatedat: Date;
}
