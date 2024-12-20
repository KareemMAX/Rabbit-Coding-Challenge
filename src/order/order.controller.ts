import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order-dto';
import { Top10OrderedProductsDTO } from './dto/top-10-ordered-products-dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() data: CreateOrderDTO) {
    return this.orderService.create(data);
  }

  @Get('top-10')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60000)
  async getTop10OrderedProducts(@Query() filters: Top10OrderedProductsDTO) {
    const response = await this.orderService.getTop10OrderedProducts(filters);
    if (!response || !response.length) {
      throw new NotFoundException();
    }

    return response;
  }
}
