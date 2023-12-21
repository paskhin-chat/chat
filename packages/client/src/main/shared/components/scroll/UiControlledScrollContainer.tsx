import { FC, ReactNode, Ref, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/system';

export interface IUiControlledScrollContainerRefHandler {
  scrollToBottom: () => void;
  scrollTo: (top: number) => void;
  getScrollHeight: () => number;
  needsToScrollToBottom: () => void;
  needsToRestoreScrollPosition: () => void;
}

interface IProps {
  refHandler: Ref<IUiControlledScrollContainerRefHandler>;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const UiControlledScrollContainer: FC<IProps> = ({ refHandler, children, sx }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [needsToScrollToBottom, setNeedsToScrollToBottom] = useState(false);
  const [needsToRestoreScrollPosition, setNeedsToRestoreScrollPosition] = useState(false);

  const prevScrollHeightRef = useRef<number | null>();

  useImperativeHandle(
    refHandler,
    () => ({
      scrollToBottom: () => {
        ref.current?.scrollTo({ top: ref.current.scrollHeight });
      },
      getScrollHeight: () => ref.current?.scrollHeight || 0,
      scrollTo: top => {
        ref.current?.scrollTo({ top });
      },
      needsToScrollToBottom: () => {
        setNeedsToScrollToBottom(true);
      },
      needsToRestoreScrollPosition: () => {
        setNeedsToRestoreScrollPosition(true);
      },
    }),
    [],
  );

  useEffect(() => {
    // TODO: maybe it's better to use scroll event handler perhaps it'd resolve the issue with wrong scroll position restoration if user scrolls while new messages are loading
    prevScrollHeightRef.current = ref.current?.scrollHeight;
  });

  useLayoutEffect(() => {
    // If we need to scroll to bottom and restore scroll position at the same time, scroll to bottom is prioritized.
    if (needsToScrollToBottom) {
      ref.current?.scrollTo({ top: ref.current.scrollHeight });
      setNeedsToScrollToBottom(false);

      return;
    }

    if (needsToRestoreScrollPosition && prevScrollHeightRef.current != null) {
      ref.current?.scrollTo({
        top: ref.current.scrollHeight - prevScrollHeightRef.current,
      });
      setNeedsToRestoreScrollPosition(false);
    }
  }, [needsToScrollToBottom, needsToRestoreScrollPosition]);

  return (
    <SParent ref={ref} sx={sx}>
      <SChild>{children}</SChild>
    </SParent>
  );
};

const SParent = styled('div')`
  overflow-y: scroll;
`;

const SChild = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
`;
