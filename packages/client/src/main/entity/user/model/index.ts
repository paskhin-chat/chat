import { gql, useQuery } from '@apollo/client';
import { UserDto } from 'api';

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
export function useUsers(): { users: IUser[]; loading: boolean } {
  const { data, loading } = useQuery<{ users: UserDto[] }>(
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

  const users: IUser[] =
    data?.users.map((user) => ({
      ...user,
      dob: user.dob ? new Date(user.dob) : undefined,
      secondName: user.secondName || undefined,
    })) || [];

  return {
    users,
    loading,
  };
}
