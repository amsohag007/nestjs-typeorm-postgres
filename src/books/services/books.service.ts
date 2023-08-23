import { Injectable, ForbiddenException } from '@nestjs/common';
import { ApiResponseDTO } from 'src/core/dtos';
import { CreateBookDTO, UpdateBookDTO, BookQueryDTO } from '../dtos';
import { NotDataFoundResponse } from 'src/core/constants';
import { Book } from '../entity';
import { BooksRepository } from '../repository';

@Injectable()
export class BooksService {
  constructor(private booksRepository: BooksRepository) {}

  //create new --------
  async create(createBookDTO: CreateBookDTO): Promise<ApiResponseDTO<Book>> {
    try {
      const createdBook = await this.booksRepository.create(createBookDTO);

      return {
        status: 'success',
        data: createdBook,
        message: 'Books created successfully.',
      };
    } catch (error) {
      console.log(error);
    }
  }

  // find all-------- can be filtered by criteria

  async findByCriteria(query: BookQueryDTO): Promise<ApiResponseDTO<Book[]>> {
    try {
      const filters = {
        title: query.title,
      };

      const totalCount = await this.booksRepository.count(filters);
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NotDataFoundResponse;
      }

      const books = await this.booksRepository.findMany(query);

      return {
        status: 'success',
        message: ' Books have been retrieved.',
        data: books,
        currentPage: query.pageIndex,
        pageSize: query.pageSize,
        totalPages: totalPages,
        totalCount: totalCount,
      };
    } catch (error) {
      console.log(error);
    }
  }

  //find one ------
  async findOne(id: string): Promise<ApiResponseDTO<Book>> {
    try {
      const book = await this.booksRepository.findOne(id);

      if (book === null) {
        return NotDataFoundResponse;
      }
      return {
        status: 'success',
        data: book,
        message: ' Book has been retrieved.',
      };
    } catch (error) {
      console.log(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updateBookDTO: UpdateBookDTO,
  ): Promise<ApiResponseDTO<Book>> {
    try {
      const updatedBookData = await this.booksRepository.update(
        id,
        updateBookDTO,
      );
      return {
        status: 'success',
        data: updatedBookData,
        message: ' Books info has been updated.',
      };
    } catch (error) {
      console.log(error);
    }
  }

  //remove
  async remove(id: string): Promise<void> {
    try {
      const book = await this.booksRepository.findOne(id);

      if (!book) {
        throw new ForbiddenException('No Book found.');
      }

      return await this.booksRepository.remove(id);
    } catch (error) {
      console.log(error);
    }
  }
}
