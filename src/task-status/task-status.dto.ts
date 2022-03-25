import { IsNotEmpty, Min } from 'class-validator';

export class TaskStatusDto {
  @IsNotEmpty()
  name: string;

  @Min(1)
  @IsNotEmpty()
  order: number;
}

export class TaskStatusUpdateDto {
  name?: string;

  @Min(1)
  order?: number;
}
