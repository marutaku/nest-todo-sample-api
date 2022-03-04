import { Board } from 'src/boards/board.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Board, { onDelete: 'CASCADE' })
  board: Board;

  @Column({
    length: 24,
    nullable: false,
  })
  title: string;

  @Column({ default: null })
  description: string;

  @Column('date', { default: null })
  deadline: Date | null = null;

  @Column()
  status: string;

  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
