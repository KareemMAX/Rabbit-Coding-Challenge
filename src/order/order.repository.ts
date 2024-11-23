import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Top10OrderedProductsDTO } from './dto/top-10-ordered-products-dto';
import { Product } from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  async findTop10OrderedProducts(
    filters: Top10OrderedProductsDTO,
  ): Promise<Product[]> {
    const group = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      where: {
        product: {
          area: filters.area,
        },
      },
      take: 10,
    });

    const promises = group.map((product) =>
      this.prisma.product.findUnique({
        where: {
          id: product.productId,
        },
      }),
    );

    return Promise.all(promises);
  }
}
