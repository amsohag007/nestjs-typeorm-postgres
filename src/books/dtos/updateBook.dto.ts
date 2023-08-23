import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateBookDTO {
  @ApiProperty({
    description: 'Book title',
    type: String,
    required: true,
  })
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Book writter',
    type: Number,
    required: true,
  })
  @IsDefined()
  @IsNumber()
  discountRate: number;

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

  constructor(partial: Partial<UpdateBookDTO>) {
    Object.assign(this, partial);
  }
}
