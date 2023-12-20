import { FC } from "react";
import noop from "lodash/noop";

import { MessageUi } from "../../../main/entities";
import { useUiField } from "../../../main/shared";
import { withGlobalStyles } from "../../__utils__";

const MessageFormFixture: FC = () => {
  const field = useUiField(
    {
      content: "",
    },
    MessageUi.messageFormShape
  );

  return <MessageUi.CreateMessageForm field={field} handleSubmit={noop} />;
};

export default withGlobalStyles(MessageFormFixture);
