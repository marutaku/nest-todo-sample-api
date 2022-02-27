import { IsNotEmpty, IsDateString } from "class-validator";

export class TaskDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  @IsDateString()
  deadline: string

}