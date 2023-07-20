import { FC } from 'react';
import styled, { css } from 'styled-components';

import { UiTime } from '../date';

/**
 * Message component properties.
 */
export interface IUiMessageProps {
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
  <SMessage $isLeft={position === 'left'}>
    <SMessageContent>
      <SMember>{isAuthorViewer ? 'You' : author}</SMember>

      <SContent>{content}</SContent>

      <STimeContent>
        <UiTime time={time} />
      </STimeContent>
    </SMessageContent>
  </SMessage>
);

const SMessage = styled.div<{ $isLeft: boolean }>(
  (props) => css`
    display: inline-flex;
    color: white;
    position: relative;
    background-color: gray;
    padding: 0.5rem;

    &:after {
      content: '';
      position: absolute;
      right: ${props.$isLeft ? undefined : '-10px'};
      left: ${props.$isLeft ? '-10px' : undefined};
      top: 0;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top-color: gray;
      border-left-color: ${props.$isLeft ? undefined : 'gray'};
      border-right-color: ${props.$isLeft ? 'gray' : undefined};
    }
  `,
);

const SMessageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: hidden;
  font-size: 1.1rem;
`;

const SContent = styled.p`
  margin: 0;
  margin-block: 0.5rem;
  overflow: hidden;
`;

const SMember = styled.span`
  align-self: start;
  font-size: 0.85rem;
`;

const STimeContent = styled.i`
  font-size: 0.8rem;
`;
