import { FC } from "react";
import { Navbar, UiBasePageLayout, UiBasePageLayoutAside } from "../../shared";
import { Typography } from "@mui/material";
import { RoomsUi } from "../../features";
import { RoomWidgetUi } from "../../widgets";

interface IProps {
  params: {
    id?: string;
  };
}

/**
 * @page
 */
const RoomPage: FC<IProps> = ({ params }) => {
  const roomId = params.id;

  return (
    <UiBasePageLayout
      mobilePriorityPart={roomId ? "content" : "aside"}
      aside={
        <UiBasePageLayoutAside
          header={<Typography>Here is a room header</Typography>}
          footer={<Navbar selected={roomId ? undefined : "rooms"} />}
        >
          <RoomsUi.RoomList roomId={roomId} />
        </UiBasePageLayoutAside>
      }
      content={<RoomWidgetUi.Room roomId={params.id} />}
    />
  );
};

/**
 * Room page.
 */
export default RoomPage;
