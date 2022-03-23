import { IsNotEmpty } from 'class-validator';

export class TaskStatusDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  order: number;
}
