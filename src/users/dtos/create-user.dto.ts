import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsArray,
  IsDefined,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'User name',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User phone',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  phone: string;

  constructor(partial: Partial<CreateUserDTO>) {
    Object.assign(this, partial);
  }
}
