import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class GetAllProductsDTO {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categories?: string[];

  @IsInt()
  @IsOptional()
  @Transform((v) => Number(v.value))
  pageNumber?: number;

  @IsInt()
  @IsOptional()
  @Transform((v) => Number(v.value))
  pageSize?: number;
}
