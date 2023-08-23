import { Module } from '@nestjs/common';
import { UsersController } from './controllers';
import { UsersService } from './services';
import { UserProviders, UsersRepository } from './repository';
import { DatabaseModule } from 'src/database/databse.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...UserProviders, UsersRepository],
})
export class UsersModule {}
