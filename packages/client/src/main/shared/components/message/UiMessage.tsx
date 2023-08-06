import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { UiTime } from '../date';

/**
 * Message component properties.
 */
export interface IUiMessageProps {
  /**
   * Message's id.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  id: string;
  /**
   * Content of user's message.
   */
  content: string;
  /**
   * Time when the message was sent.
   */
  time: Date;
  /**
   * User that created the message.
   */
  author: string;
  /**
   * Is user the current viewer.
   *
   * @default false
   */
  isAuthorViewer?: boolean;

  /**
   * Is message renders on left or right position.
   *
   * @default right
   */
  position?: 'left' | 'right';
}

/**
 * Renders room's message.
 */
export const UiMessage: FC<IUiMessageProps> = ({
  content,
  time,
  author,
  isAuthorViewer,
  position = 'right',
}) => (
  <SMessage isLeft={position === 'left'}>
    <Box
      display='flex'
      flexDirection='column'
      alignItems='flex-end'
      overflow='hidden'
    >
      <Typography variant='caption' alignSelf='start'>
        {isAuthorViewer ? 'You' : author}
      </Typography>

      <Typography component='p'>{content}</Typography>

      <UiTime time={time} />
    </Box>
  </SMessage>
);

const SMessage = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isLeft',
})<{ isLeft: boolean }>(({ isLeft, theme }) => ({
  display: 'inline-flex',
  position: 'relative',
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
  borderTopRightRadius: isLeft ? theme.spacing(0.5) : 0,
  borderTopLeftRadius: isLeft ? 0 : theme.spacing(0.5),

  ':after': {
    content: '""',
    position: 'absolute',
    right: isLeft ? undefined : theme.spacing(-1),
    left: isLeft ? theme.spacing(-1) : undefined,
    top: 0,
    width: 0,
    height: 0,
    border: `${theme.spacing(0.5)} solid transparent`,
    borderTopColor: theme.palette.primary.light,
    borderLeftColor: isLeft ? undefined : theme.palette.primary.light,
    borderRightColor: isLeft ? theme.palette.primary.light : undefined,
  },
}));
