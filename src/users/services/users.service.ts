import { Injectable, ForbiddenException } from '@nestjs/common';
import { ApiResponseDTO } from 'src/core/dtos';
import { CreateUserDTO, UpdateUserDTO, UserQueryDTO } from '../dtos';
import { NotDataFoundResponse } from 'src/core/constants';
import { User } from '../entity';
import { UsersRepository } from '../repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  //create new --------
  async create(createUserDTO: CreateUserDTO): Promise<ApiResponseDTO<User>> {
    try {
      const createdUser = await this.usersRepository.create(createUserDTO);

      return {
        status: 'success',
        data: createdUser,
        message: 'Users created successfully.',
      };
    } catch (error) {
      console.log(error);
    }
  }

  // find all-------- can be filtered by criteria

  async findByCriteria(query: UserQueryDTO): Promise<ApiResponseDTO<User[]>> {
    try {
      const filters = {
        email: query.email,
        name: query.name,
      };

      const totalCount = await this.usersRepository.count(filters);
      const totalPages = Math.ceil(totalCount / query.pageSize);

      if (totalCount === 0) {
        return NotDataFoundResponse;
      }

      const users = await this.usersRepository.findMany(query);

      return {
        status: 'success',
        message: ' Users have been retrieved.',
        data: users,
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
  async findOne(id: string): Promise<ApiResponseDTO<User>> {
    try {
      const user = await this.usersRepository.findOne(id);

      if (user === null) {
        return NotDataFoundResponse;
      }
      return {
        status: 'success',
        data: user,
        message: ' User has been retrieved.',
      };
    } catch (error) {
      console.log(error);
    }
  }

  //update ----------
  async update(
    id: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<ApiResponseDTO<User>> {
    try {
      const updatedUserData = await this.usersRepository.update(
        id,
        updateUserDTO,
      );
      return {
        status: 'success',
        data: updatedUserData,
        message: ' Users info has been updated.',
      };
    } catch (error) {
      console.log(error);
    }
  }

  //remove
  async remove(id: string): Promise<void> {
    try {
      const user = await this.usersRepository.findOne(id);

      if (!user) {
        throw new ForbiddenException('No User found.');
      }

      return await this.usersRepository.remove(id);
    } catch (error) {
      console.log(error);
    }
  }
}
