import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    BooksModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
