import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsArray,
  IsDefined,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/users/entity';

export class CreateBookDTO {
  @ApiProperty({
    description: 'Book title',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Book writter',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  writer: string;

  @ApiProperty({
    description: 'Book coverImage',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  coverImage: string;

  @ApiProperty({
    description: 'Book price',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'User Id',
    type: String,
    required: true,
  })
  @IsDefined()
  user: User;

  constructor(partial: Partial<CreateBookDTO>) {
    Object.assign(this, partial);
  }
}
