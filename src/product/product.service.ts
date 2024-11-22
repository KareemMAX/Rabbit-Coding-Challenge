import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { ProductDTO } from './dto/product.dto';

const DEFAULT_PAGE_SIZE = 50;

@Injectable()
export class ProductService {
  constructor(
    private readonly productsRepository: ProductRepository,
    private prismaService: PrismaService,
  ) {}

  async getAllProducts(filters: GetAllProductsDTO): Promise<ProductDTO[]> {
    const take = filters.pageSize || DEFAULT_PAGE_SIZE;
    const pageNumber = filters.pageNumber || 1;
    const skip = take * (pageNumber - 1);

    return this.prismaService.product.findMany({
      where: {
        category: {
          in: filters.categories,
        },
      },
      take,
      skip,
    });
  }

  async getProductById(id: number): Promise<ProductDTO> {
    return this.productsRepository.findById(id);
  }
}
