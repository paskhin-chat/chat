import { FC } from 'react';
import { Divider, List, ListItemButton, ListItemText, Stack } from '@mui/material';

import { UserDto, formatUserName } from '../../../shared';

interface IProps {
  users: UserDto[];
  onUserSelect: (id: string) => void;
  selectedUserId: string | undefined;
}

/**
 * Renders the use listing.
 */
export const UserList: FC<IProps> = ({ users, onUserSelect, selectedUserId }) => (
  <List>
    <Stack divider={<Divider />}>
      {users.map(user => (
        <ListItemButton key={user.id} onClick={() => onUserSelect(user.id)} selected={selectedUserId === user.id}>
          <ListItemText primary={formatUserName(user)} />
        </ListItemButton>
      ))}
    </Stack>
  </List>
);
