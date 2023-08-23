import { DataSource } from 'typeorm';
import { Book } from '../entity';

export const BookProviders = [
  {
    provide: 'BOOK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Book),
    inject: ['DATA_SOURCE'],
  },
];
