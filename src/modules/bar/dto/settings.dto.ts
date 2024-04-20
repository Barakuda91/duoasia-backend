import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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
