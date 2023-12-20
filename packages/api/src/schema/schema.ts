/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */

/* eslint-disable */

export interface UpdateUserInput {
  login?: Nullable<string>;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  secondName?: Nullable<string>;
  dob?: Nullable<string>;
  password?: Nullable<string>;
  id: string;
}

export interface CreateUserInput {
  login: string;
  firstName: string;
  lastName: string;
  secondName?: Nullable<string>;
  dob?: Nullable<string>;
  password: string;
}

export interface RegisterInput {
  login: string;
  firstName: string;
  lastName: string;
  secondName?: Nullable<string>;
  password: string;
}

export interface LoginInput {
  login: string;
  password: string;
}

export interface CreateRoomInput {
  userIds: string[];
  name?: Nullable<string>;
}

export interface CreateMessageInput {
  roomId: string;
  content: string;
}

export interface UserDto {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  secondName?: Nullable<string>;
  dob?: Nullable<Date>;
}

export interface MemberDto {
  id: string;
  joinDate: Date;
  user: UserDto;
}

export interface RoomDto {
  id: string;
  name?: Nullable<string>;
  creationDate?: Nullable<DateTime>;
  members: MemberDto[];
}

export interface MessageDto {
  id: string;
  user: UserDto;
  roomId: string;
  content: string;
  sendTime: Date;
}

export interface IQuery {
  viewer(): Nullable<UserDto> | Promise<Nullable<UserDto>>;

  user(id: string): Nullable<UserDto> | Promise<Nullable<UserDto>>;

  users(): UserDto[] | Promise<UserDto[]>;

  rooms(): RoomDto[] | Promise<RoomDto[]>;

  messages(
    roomId: string,
    cursor?: Nullable<string>,
  ): MessageDto[] | Promise<MessageDto[]>;
}

export interface IMutation {
  updateUser(input: UpdateUserInput): UserDto | Promise<UserDto>;

  removeUser(id: string): UserDto | Promise<UserDto>;

  createUser(input: CreateUserInput): UserDto | Promise<UserDto>;

  register(input: RegisterInput): string | Promise<string>;

  login(input: LoginInput): string | Promise<string>;

  refreshAccessToken(): string | Promise<string>;

  logout(): boolean | Promise<boolean>;

  createRoom(input: CreateRoomInput): RoomDto | Promise<RoomDto>;

  createMessage(input: CreateMessageInput): MessageDto | Promise<MessageDto>;
}

export interface ISubscription {
  userCreated(): UserDto | Promise<UserDto>;

  messageCreated(): MessageDto | Promise<MessageDto>;
}

export type DateTime = any;
type Nullable<T> = T | null;
