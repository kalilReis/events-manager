import { Module } from '@nestjs/common';
import { OrdersRepository } from '../orders.repository';
import { OrdersRelationalRepository } from './repositories/orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersEntity])],
  providers: [
    {
      provide: OrdersRepository,
      useClass: OrdersRelationalRepository,
    },
  ],
  exports: [OrdersRepository],
})
export class RelationalOrdersPersistenceModule {}
