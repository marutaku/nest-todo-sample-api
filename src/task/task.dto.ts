import { IsNotEmpty, IsDate, IsOptional } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string | undefined;

  @IsOptional()
  @IsDate()
  deadline?: string | undefined;
}
