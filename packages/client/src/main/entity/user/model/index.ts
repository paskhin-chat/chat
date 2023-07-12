import { gql } from '@apollo/client';
import { UserDto } from 'api';

import { IExecutor, useQueryExecutor } from 'shared';

/**
 * User.
 */
export interface IUser {
  /**
   * User's id.
   */
  id: string;
  /**
   * User's login.
   */
  login: string;
  /**
   * User's first name.
   */
  firstName: string;
  /**
   * User's last name.
   */
  lastName: string;
  /**
   * User's second name.
   */
  secondName?: string;
  /**
   * User's dob.
   */
  dob?: Date;
}

/**
 * Hooks for getting and storing users.
 */
export function useUsersExecutor(): IExecutor<IUser[]> {
  const executor = useQueryExecutor<{ users: UserDto[] }>(
    gql`
      query Users {
        users {
          id
          login
          firstName
          lastName
          secondName
          dob
        }
      }
    `,
  );

  return {
    ...executor,
    response:
      executor.response?.users &&
      executor.response.users.map((user) => userMapper(user)),
  };
}

function userMapper(dto: UserDto): IUser {
  return {
    id: dto.id,
    firstName: dto.firstName,
    secondName: dto.secondName || undefined,
    lastName: dto.lastName,
    login: dto.login,
    dob: dto.dob ? new Date(dto.dob) : undefined,
  };
}
