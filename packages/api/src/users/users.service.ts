import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  public constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creates new user and returns it.
   *
   * @param createUserInput
   */
  public create(createUserInput: CreateUserInput): Promise<User> {
    return this.prismaService.user.create({
      data: createUserInput,
    });
  }

  /**
   * Finds all users.
   */
  public async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  /**
   * Finds concrete user.
   *
   * @param id
   */
  public findOne(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  /**
   * Updates user and returns it.
   *
   * @param id
   * @param updateUserInput
   */
  public update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  /**
   * Removes concrete user and returns it.
   *
   * @param id
   */
  public remove(id: string): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
