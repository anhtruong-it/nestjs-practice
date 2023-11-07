/* eslint-disable prettier/prettier */
import { IsDateString, IsString, Length } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateEventDto {
  @IsString()
  @Length(5, 255, {message: 'The name length is wrong'})
  name: string;
  @Length(5, 255)
  description: string;
  @IsDateString()
  when: string;
  @Length(5, 255)
  address: string;
}
