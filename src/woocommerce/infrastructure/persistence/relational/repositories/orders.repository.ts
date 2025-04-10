import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrdersEntity } from '../entities/orders.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Orders } from '../../../../domain/orders';
import { OrdersRepository } from '../../orders.repository';
import { OrdersMapper } from '../mappers/orders.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class OrdersRelationalRepository implements OrdersRepository {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersRepository: Repository<OrdersEntity>,
  ) {}

  async create(data: Orders): Promise<Orders> {
    const persistenceModel = OrdersMapper.toPersistence(data);
    const newEntity = await this.ordersRepository.save(
      this.ordersRepository.create(persistenceModel),
    );
    return OrdersMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Orders[]> {
    const entities = await this.ordersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => OrdersMapper.toDomain(entity));
  }

  async findById(id: Orders['id']): Promise<NullableType<Orders>> {
    const entity = await this.ordersRepository.findOne({
      where: { id },
    });

    return entity ? OrdersMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Orders['id'][]): Promise<Orders[]> {
    const entities = await this.ordersRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => OrdersMapper.toDomain(entity));
  }

  async update(id: Orders['id'], payload: Partial<Orders>): Promise<Orders> {
    const entity = await this.ordersRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.ordersRepository.save(
      this.ordersRepository.create(
        OrdersMapper.toPersistence({
          ...OrdersMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrdersMapper.toDomain(updatedEntity);
  }

  async remove(id: Orders['id']): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
