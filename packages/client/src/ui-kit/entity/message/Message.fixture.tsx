import { useSelect, useValue } from "react-cosmos/client";
import { faker } from "@faker-js/faker";
import { FC } from "react";

import { MessageUi } from "../../../main/entities";
import { withGlobalStyles, useBooleanValue } from "../../__utils__";
import { getMessageContent, getUserName } from "../../__mock__";
import { formatUserName } from "../../../main/shared";
import { UserDto } from "../../../main/gen/api-types";

const defaultContent = getMessageContent();
const defaultTime = faker.date.anytime().toISOString();

const MessageFixture: FC = () => {
  const [position] = useSelect("position", {
    defaultValue: "right",
    options: ["left", "right"],
  });
  const [content] = useValue("content", {
    defaultValue: defaultContent,
  });
  const [time] = useValue("time", {
    defaultValue: defaultTime,
  });
  const [isAuthorViewer] = useBooleanValue("isAuthorViewer");

  const user: UserDto = {
    __typename: "UserDto",
    id: faker.string.uuid(),
    login: faker.internet.userName(),
    ...getUserName(),
  };

  return (
    <MessageUi.Message
      message={{
        __typename: "MessageDto",
        content,
        sendTime: time,
        id: faker.string.uuid(),
        roomId: faker.string.uuid(),
        user,
      }}
      title={isAuthorViewer ? "You" : formatUserName(user)}
      position={position}
    />
  );
};

export default withGlobalStyles(MessageFixture);
