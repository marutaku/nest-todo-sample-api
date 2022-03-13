import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  // TODO: パスワードの強度について検証するコードを追加
  password: string;
}
