import {
  // common
  Module,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { RelationalOrdersPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    // import modules, etc.
    RelationalOrdersPersistenceModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService, RelationalOrdersPersistenceModule],
})
export class OrdersModule {}
