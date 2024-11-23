import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

type PageOptions = { limit: number; offset: number };

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(options?: PageOptions): Promise<Product[]> {
    return this.prisma.product.findMany({
      take: options.limit,
      skip: options.offset,
    });
  }

  async findByCategories(categories: string[], options?: PageOptions) {
    return this.prisma.product.findMany({
      where: {
        category: {
          in: categories,
        },
      },
      take: options.limit,
      skip: options.offset,
    });
  }

  async findById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: {
    name: string;
    category: string;
    area: string;
  }): Promise<Product> {
    return this.prisma.product.create({ data });
  }
}
