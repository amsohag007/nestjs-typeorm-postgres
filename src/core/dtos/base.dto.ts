import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsObject,
  IsUUID,
} from 'class-validator';

export class BaseDTO {
  @ApiProperty({
    description: 'id of the record.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsUUID()
  id!: string;

  @ApiPropertyOptional({
    description: 'user id by whom the record was created.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsUUID()
  createdById!: string;

  @ApiPropertyOptional({
    description: 'user id by whom the record was updated.',
    type: String,
    required: false,
  })
  @IsDefined()
  @IsUUID()
  updatedById?: string;

  @ApiPropertyOptional({
    description: 'time when the record was created.',
    type: Date,
    required: false,
  })
  @IsDefined()
  @IsDateString({ strict: true } as any)
  createdAt!: Date;

  @ApiPropertyOptional({
    description: 'time when the record was updated.',
    type: Date,
    required: false,
  })
  @IsDefined()
  @IsDateString({ strict: true } as any)
  updatedAt!: Date;
}
