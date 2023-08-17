import { FC } from 'react';
import { Link as RouterLink } from 'wouter';
import { Link } from '@mui/material';

interface IProps {
  href: string;
  children: string;
}

/**
 * Simple base text link for internal routing.
 */
export const UiTextLink: FC<IProps> = ({ href, children }) => (
  <RouterLink href={href}>
    <Link underline='hover'>{children}</Link>
  </RouterLink>
);
