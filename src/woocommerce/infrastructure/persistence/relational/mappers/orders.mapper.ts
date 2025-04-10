import { Orders } from '../../../../domain/orders';
import { OrdersEntity } from '../entities/orders.entity';

export class OrdersMapper {
  static toDomain(raw: OrdersEntity): Orders {
    const domainEntity = new Orders();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Orders): OrdersEntity {
    const persistenceEntity = new OrdersEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
