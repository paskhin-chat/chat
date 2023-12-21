import { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { css, styled } from '@mui/material/styles';

import { UiTime, MessageDto } from '../../../shared';

interface IProps {
  message: MessageDto;
  position: 'left' | 'right';
  title: string;
}

/**
 * Message cloud component.
 */
export const Message: FC<IProps> = ({ message, position, title }) => (
  <SMessage isLeft={position === 'left'}>
    <Stack overflow='hidden' spacing={1}>
      <Typography variant='caption' alignSelf='start'>
        {title}
      </Typography>

      <Typography component='p'>{message.content}</Typography>

      <UiTime time={message.sendTime} />
    </Stack>
  </SMessage>
);

const SMessage = styled(Box, {
  shouldForwardProp: prop => prop !== 'isLeft',
})<{ isLeft: boolean }>(
  ({ isLeft, theme }) => css`
    display: inline-flex;
    position: relative;
    color: ${theme.palette.primary.contrastText};
    background-color: ${theme.palette.primary.light};
    padding: ${theme.spacing(1)};
    border-radius: ${theme.spacing(0.5)};
    border-top-right-radius: ${isLeft ? theme.spacing(0.5) : 0};
    border-top-left-radius: ${isLeft ? 0 : theme.spacing(0.5)};

    :after {
      content: '';
      position: absolute;
      right: ${isLeft ? undefined : theme.spacing(-1)};
      left: ${isLeft ? theme.spacing(-1) : undefined};
      top: 0;
      width: 0;
      height: 0;
      border: ${theme.spacing(0.5)} solid transparent;
      border-top-color: ${theme.palette.primary.light};
      border-left-color: ${isLeft ? undefined : theme.palette.primary.light};
      border-right-color: ${isLeft ? theme.palette.primary.light : undefined};
    }
  `,
);
