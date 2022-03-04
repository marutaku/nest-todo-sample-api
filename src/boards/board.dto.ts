import { IsNotEmpty, MaxLength } from 'class-validator';

export class BoardDto {
  @IsNotEmpty()
  name: string;

  @MaxLength(100)
  description: string;
}
