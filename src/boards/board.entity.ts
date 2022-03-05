import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  readonly createdAt?: Timestamp;

  @UpdateDateColumn()
  readonly updatedAt?: Timestamp;
}
