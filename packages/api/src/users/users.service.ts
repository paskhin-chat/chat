import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { CreateUserInput } from './dto/create-user.input';
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
   * Finds concrete user by id.
   */
  public async findOne(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  /**
   * Finds concrete user by login.
   */
  public async findByLogin(login: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { login },
    });
  }

  /**
   * Updates user and returns it.
   */
  public update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserInput,
    });
  }

  /**
   * Removes concrete user and returns it.
   */
  public remove(id: string): Promise<User> {
    return this.prismaService.user.delete({ where: { id } });
  }
}
