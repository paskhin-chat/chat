
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

export interface UserDto {
    id: string;
    login: string;
    firstName: string;
    lastName: string;
    secondName?: Nullable<string>;
    dob?: Nullable<DateTime>;
}

export interface MemberDto {
    id: string;
    joinDate: DateTime;
    user: UserDto;
}

export interface RoomDto {
    id: string;
    name?: Nullable<string>;
    creationDate?: Nullable<DateTime>;
    members: MemberDto[];
}

export interface IQuery {
    user(id: string): Nullable<UserDto> | Promise<Nullable<UserDto>>;
    room(id: string): Nullable<RoomDto> | Promise<Nullable<RoomDto>>;
    rooms(): Nullable<RoomDto[]> | Promise<Nullable<RoomDto[]>>;
}

export interface IMutation {
    updateUser(input: UpdateUserInput): UserDto | Promise<UserDto>;
    removeUser(id: string): UserDto | Promise<UserDto>;
    createUser(input: CreateUserInput): UserDto | Promise<UserDto>;
    register(input: RegisterInput): string | Promise<string>;
    login(input: LoginInput): string | Promise<string>;
    createRoom(input: CreateRoomInput): RoomDto | Promise<RoomDto>;
}

export interface ISubscription {
    userCreated(): UserDto | Promise<UserDto>;
}

export type DateTime = string;
type Nullable<T> = T | null;
