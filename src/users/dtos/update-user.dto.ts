import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    description: 'User name',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User phone',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  phone: string;

  constructor(partial: Partial<UpdateUserDTO>) {
    Object.assign(this, partial);
  }
}
