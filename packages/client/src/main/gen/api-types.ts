export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
}

export interface CreateMessageInput {
  content: Scalars["String"]["input"];
  roomId: Scalars["ID"]["input"];
}

export interface CreateRoomInput {
  name?: InputMaybe<Scalars["String"]["input"]>;
  userIds: Array<Scalars["ID"]["input"]>;
}

export interface CreateUserInput {
  dob?: InputMaybe<Scalars["String"]["input"]>;
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  login: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  secondName?: InputMaybe<Scalars["String"]["input"]>;
}

export interface LoginInput {
  login: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}

export interface MemberDto {
  __typename: "MemberDto";
  id: Scalars["ID"]["output"];
  joinDate: Scalars["Date"]["output"];
  user: UserDto;
}

export interface MessageDto {
  __typename: "MessageDto";
  content: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  roomId: Scalars["String"]["output"];
  sendTime: Scalars["Date"]["output"];
  user: UserDto;
}

export interface Mutation {
  __typename: "Mutation";
  createMessage: MessageDto;
  createRoom: RoomDto;
  createUser: UserDto;
  login: Scalars["String"]["output"];
  logout: Scalars["Boolean"]["output"];
  refreshAccessToken: Scalars["String"]["output"];
  register: Scalars["String"]["output"];
  removeUser: UserDto;
  updateUser: UserDto;
}

export interface MutationCreateMessageArgs {
  input: CreateMessageInput;
}

export interface MutationCreateRoomArgs {
  input: CreateRoomInput;
}

export interface MutationCreateUserArgs {
  input: CreateUserInput;
}

export interface MutationLoginArgs {
  input: LoginInput;
}

export interface MutationRegisterArgs {
  input: RegisterInput;
}

export interface MutationRemoveUserArgs {
  id: Scalars["ID"]["input"];
}

export interface MutationUpdateUserArgs {
  input: UpdateUserInput;
}

export interface Query {
  __typename: "Query";
  messages: Array<MessageDto>;
  rooms: Array<RoomDto>;
  user?: Maybe<UserDto>;
  users: Array<UserDto>;
  viewer?: Maybe<UserDto>;
}

export interface QueryMessagesArgs {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  roomId: Scalars["ID"]["input"];
}

export interface QueryUserArgs {
  id: Scalars["ID"]["input"];
}

export interface RegisterInput {
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  login: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  secondName?: InputMaybe<Scalars["String"]["input"]>;
}

export interface RoomDto {
  __typename: "RoomDto";
  creationDate?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  members: Array<MemberDto>;
  name?: Maybe<Scalars["String"]["output"]>;
}

export interface Subscription {
  __typename: "Subscription";
  messageCreated: MessageDto;
  userCreated: UserDto;
}

export interface UpdateUserInput {
  dob?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["ID"]["input"];
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  login?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  secondName?: InputMaybe<Scalars["String"]["input"]>;
}

export interface UserDto {
  __typename: "UserDto";
  dob?: Maybe<Scalars["Date"]["output"]>;
  firstName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  lastName: Scalars["String"]["output"];
  login: Scalars["String"]["output"];
  secondName?: Maybe<Scalars["String"]["output"]>;
}
