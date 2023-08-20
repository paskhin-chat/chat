import { FC } from 'react';
import { Stack, IconButton } from '@mui/material';
import { Forum, People } from '@mui/icons-material';
import { useLocation } from 'wouter';

interface IProps {
  selected?: 'rooms' | 'users';
}

/**
 * Renders base app navbar.
 */
export const Navbar: FC<IProps> = ({ selected }) => {
  const [, setLocation] = useLocation();

  return (
    <Stack spacing={2} direction='row'>
      <IconButton
        onClick={() => setLocation('/users')}
        color={selected === 'users' ? 'primary' : 'default'}
      >
        <People />
      </IconButton>

      <IconButton
        onClick={() => setLocation('/rooms')}
        color={selected === 'rooms' ? 'primary' : 'default'}
      >
        <Forum />
      </IconButton>
    </Stack>
  );
};
