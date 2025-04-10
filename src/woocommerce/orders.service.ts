import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';
import { OrdersRepository } from './infrastructure/persistence/orders.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Orders } from './domain/orders';

@Injectable()
export class OrdersService {
  private readonly ordersUrl = process.env.WOOCOMMERCE_ORDERS_URL;
  private readonly consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  private readonly consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  constructor(
    // Dependencies here
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createOrdersDto: CreateOrdersDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.ordersRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.ordersRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Orders['id']) {
    return this.ordersRepository.findById(id);
  }

  findByIds(ids: Orders['id'][]) {
    return this.ordersRepository.findByIds(ids);
  }

  async update(
    id: Orders['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateOrdersDto: UpdateOrdersDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.ordersRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Orders['id']) {
    return this.ordersRepository.remove(id);
  }

  async getOrders() {
    const headers = {
      Authorization:
        'Basic ' + btoa(`${this.consumerKey}:${this.consumerSecret}`),
    };

    const ordersAcc = new Array<any>();

    let page = 1;

    while (page > 0) {
      const response = await fetch(
        `${this.ordersUrl}?page=${page}&per_page=100`,
        {
          method: 'GET',
          headers: headers,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const orders = await response.json();

      page++;

      if (orders.length == 0) {
        page = 0;
      } else {
        ordersAcc.push(...orders);
      }
    }

    return ordersAcc;
  }
}
