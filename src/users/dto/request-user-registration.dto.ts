import { IsNotEmpty, IsString } from 'class-validator';

export class RequestUserRegistrationDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
