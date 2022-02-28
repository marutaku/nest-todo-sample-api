import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

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
