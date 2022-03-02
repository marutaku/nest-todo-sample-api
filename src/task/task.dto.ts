import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string | undefined;

  @IsOptional()
  @IsDateString()
  deadline?: string | undefined;
}
