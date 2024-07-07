import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class SettingDto {
  @IsNotEmpty()
  id?: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  required: boolean;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsArray()
  @IsNotEmpty()
  answers: string[];
}
