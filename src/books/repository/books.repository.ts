import { CreateBookDTO, UpdateBookDTO, BookQueryDTO } from '../dtos';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from '../entity';

@Injectable()
export class BooksRepository {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: Repository<Book>,
  ) {}

  async create(data: CreateBookDTO): Promise<Book> {
    const newData = this.bookRepository.create(data);
    return this.bookRepository.save(newData);
  }

  async findMany(query: BookQueryDTO): Promise<Book[]> {
    const filters = {
      title: query.title,
    };

    return await this.bookRepository.find({
      order: {
        title: 'desc',
      },
      take: query.pageSize,
      skip: (query.pageIndex - 1) * query.pageSize,
      where: filters,
    });
  }

  async count(query: object): Promise<number> {
    return await this.bookRepository.count(query);
  }

  async findOne(id: string): Promise<Book | null> {
    return this.bookRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, data: UpdateBookDTO): Promise<Book | null> {
    await this.bookRepository.update(id, data);
    return this.bookRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.bookRepository.delete({ id });
  }
}
