import { CreateUserDTO, UpdateUserDTO, UserQueryDTO } from '../dtos';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDTO): Promise<User> {
    const newData = this.userRepository.create(data);
    return this.userRepository.save(newData);
  }

  async findMany(query: UserQueryDTO): Promise<User[]> {
    const filters = {
      email: query.email,
      name: query.name,
    };

    return await this.userRepository.find({
      order: {
        name: 'desc',
      },
      take: query.pageSize,
      skip: (query.pageIndex - 1) * query.pageSize,
      where: filters,
      relations: ['books'],
    });
  }

  async count(query: object): Promise<number> {
    return await this.userRepository.count(query);
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    await this.userRepository.update(id, data);
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
