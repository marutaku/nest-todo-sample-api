import { IsNotEmpty } from 'class-validator';

export class CreateTaskStatusDto {
  @IsNotEmpty()
  name: string;
}

export class UpdateTaskStatusDto {
  name?: string;
}
