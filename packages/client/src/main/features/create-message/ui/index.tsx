import { FC } from "react";

import { useUiField } from "../../../shared";
import { messageModel, MessageUi, viewerModel } from "../../../entities";

interface IProps {
  roomId: string;
  onSubmitted: () => void;
}

/**
 * @feature
 */
export const CreateMessage: FC<IProps> = ({ roomId, onSubmitted }) => {
  const field = useUiField({ content: "" }, MessageUi.messageFormShape);

  const viewerStore = viewerModel.useViewerStore();

  const messagesStore = messageModel.useMessagesStore();
  const createMessageExecutor = messageModel.useCreateMessageExecutor({
    onPreExecute: () => {
      const tempId = `temp-${Date.now()}`;

      messagesStore.append({
        __typename: "MessageDto",
        id: tempId,
        content: field.value.content,
        sendTime: new Date().toISOString(),
        user: viewerStore.state!,
        roomId,
      });

      field.reset();

      onSubmitted();

      return {
        id: tempId,
      };
    },
    onSuccess: (data, optimisticData) => {
      if (!data?.createMessage || !optimisticData) {
        return;
      }

      messagesStore.modify(
        (message) => message.id === optimisticData.id,
        data.createMessage
      );
    },
  });

  const handleSubmit = (): void => {
    if (!field.value.content) {
      return;
    }

    field.clearErrors();
    field.validate();

    if (field.isInvalid) {
      return;
    }

    createMessageExecutor.execute({
      input: {
        content: field.value.content,
        roomId,
      },
    });
  };

  return (
    <MessageUi.CreateMessageForm field={field} handleSubmit={handleSubmit} />
  );
};
