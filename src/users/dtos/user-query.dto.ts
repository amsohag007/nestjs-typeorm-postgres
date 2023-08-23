import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryCriteriaDTO } from 'src/core/dtos';

export class UserQueryDTO extends BaseQueryCriteriaDTO {
  @ApiPropertyOptional({
    description: 'User name',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  name: string = undefined;

  @ApiPropertyOptional({
    description: 'User email',
    type: String,
    required: true,
  })
  @IsOptional()
  @IsString()
  email: string = undefined;
}
