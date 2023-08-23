import { DataSource } from 'typeorm';
import { User } from '../entity';

export const UserProviders = [
  {
    provide: 'BOOK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
