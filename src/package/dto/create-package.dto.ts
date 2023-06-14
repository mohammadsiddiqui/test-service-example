import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePackageDto {
  @ApiPropertyOptional()
  name?: string;
}
