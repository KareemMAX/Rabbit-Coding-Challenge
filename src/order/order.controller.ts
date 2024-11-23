import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order-dto';
import { Top10OrderedProductsDTO } from './dto/top-10-ordered-products-dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() data: CreateOrderDTO) {
    return this.orderService.create(data);
  }

  @Get('top-10')
  async getTop10OrderedProducts(@Query() filters: Top10OrderedProductsDTO) {
    return this.orderService.getTop10OrderedProducts(filters);
  }
}
