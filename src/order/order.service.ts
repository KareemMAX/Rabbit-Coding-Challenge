import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order-dto';
import { Top10OrderedProductsDTO } from './dto/top-10-ordered-products-dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(orderData: CreateOrderDTO) {}

  async getTop10OrderedProducts(filters: Top10OrderedProductsDTO) {
    return this.orderRepository.findTop10OrderedProducts(filters);
  }
}
