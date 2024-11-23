import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllProductsDTO } from './dto/get-all-products.dto';
import { ProductDTO } from './dto/product.dto';

const DEFAULT_PAGE_SIZE = 50;

@Injectable()
export class ProductService {
  constructor(private readonly productsRepository: ProductRepository) {}

  async getAllProducts(filters: GetAllProductsDTO): Promise<ProductDTO[]> {
    const limit = filters.pageSize || DEFAULT_PAGE_SIZE;
    const pageNumber = filters.pageNumber || 1;
    const offset = limit * (pageNumber - 1);

    if (filters.categories && filters.categories.length) {
      return this.productsRepository.findByCategories(
        filters.categories || [],
        {
          limit,
          offset,
        },
      );
    }

    return this.productsRepository.findAll({
      limit,
      offset,
    });
  }

  async getProductById(id: number): Promise<ProductDTO> {
    return this.productsRepository.findById(id);
  }
}
