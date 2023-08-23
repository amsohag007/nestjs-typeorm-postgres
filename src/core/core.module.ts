import { Global, Module } from '@nestjs/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';

@Global()
@Module({
  imports: [],
  controllers: [CoreController],
  providers: [CoreService],
  exports: [],
})
export class CoreModule {}
