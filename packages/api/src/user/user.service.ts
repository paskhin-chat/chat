import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  /**
   * Creates new user and returns it.
   */
  public create(createUserInput: CreateUserInput): Promise<User> {
    return this.prismaService.user.create({
      data: createUserInput,
    });
  }

  /**
   * Finds users by its ids.
   */
  public async findByIds(ids: string[]): Promise<User[]> {
    return this.prismaService.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  /**
   * Finds concrete user by id.
   */
  public async findById(id: string): Promise<User | null> {
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
   * Finds member's user.
   */
  public findUserByMemberId(memberId: string): Promise<User | null> {
    // TODO: dont use non user methods and check it everywhere
    return this.prismaService.member
      .findUnique({ where: { id: memberId } })
      .user();
  }

  /**
   * Finds all users.
   */
  public findAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
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
