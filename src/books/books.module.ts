import { Module } from '@nestjs/common';
import { BooksController } from './controllers';
import { BooksService } from './services';
import { BooksRepository } from './repository';
import { DatabaseModule } from 'src/database/databse.module';
import { BookProviders } from './repository/book.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [BooksService, ...BookProviders, BooksRepository],
})
export class BooksModule {}
