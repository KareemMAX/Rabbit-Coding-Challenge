import { IsOptional, IsString } from 'class-validator';

export class Top10OrderedProductsDTO {
  @IsString()
  @IsOptional()
  area?: string;
}
