import { FC } from 'react';
import { styled, Theme, Typography, useMediaQuery } from '@mui/material';
import { css } from '@mui/material/styles';

import { MessageUi, RoomsUi } from 'feature';
import { Navbar, UiBasePageLayout, UiFlexCentered } from 'shared';

interface IProps {
  params: {
    id?: string;
  };
}

const RoomsPage: FC<IProps> = ({ params }) => {
  const smUpper = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));

  const roomListShown = smUpper || !params.id;
  const roomContainerShown = smUpper || !!params.id;

  return (
    <UiBasePageLayout
      aside={
        roomListShown ? <RoomsUi.RoomList roomId={params.id} /> : undefined
      }
      asideHeader={<Typography>Here is a room header</Typography>}
      asideFooter={<Navbar selected={params.id ? undefined : 'rooms'} />}
      contentHeader={
        <Typography>Here is member&apos;s name or room&apos;s name</Typography>
      }
      contentFooter={
        params.id ? <MessageUi.CreateMessage roomId={params.id} /> : undefined
      }
    >
      {roomContainerShown ? (
        params.id ? (
          <SMessageList>
            <MessageUi.MessageList roomId={params.id} />
          </SMessageList>
        ) : (
          <UiFlexCentered>
            <Typography>Choose a room</Typography>
          </UiFlexCentered>
        )
      ) : null}
    </UiBasePageLayout>
  );
};

/**
 * Room page.
 */
export default RoomsPage;

const SMessageList = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
    overflow-y: scroll;
    padding-bottom: ${theme.spacing(1)};
  `,
);
