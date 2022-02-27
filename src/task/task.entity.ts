import { Entity, Column, PrimaryGeneratedColumn, Timestamp, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 24,
    nullable: false
  })
  title: string;

  @Column()
  description: string;

  @Column({
    nullable: false
  })
  deadline: Timestamp

  @Column()
  finished: boolean;
  @CreateDateColumn()
  readonly createdAt?: Date;

  @UpdateDateColumn()
  readonly updatedAt?: Date;
}

