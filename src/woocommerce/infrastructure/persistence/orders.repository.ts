import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Orders } from '../../domain/orders';

export abstract class OrdersRepository {
  abstract create(
    data: Omit<Orders, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Orders>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Orders[]>;

  abstract findById(id: Orders['id']): Promise<NullableType<Orders>>;

  abstract findByIds(ids: Orders['id'][]): Promise<Orders[]>;

  abstract update(
    id: Orders['id'],
    payload: DeepPartial<Orders>,
  ): Promise<Orders | null>;

  abstract remove(id: Orders['id']): Promise<void>;
}
