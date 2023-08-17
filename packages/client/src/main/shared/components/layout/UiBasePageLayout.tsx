import { FC, ReactNode } from 'react';
import { css, styled } from '@mui/material/styles';

interface IProps {
  aside?: ReactNode;
  asideHeader?: ReactNode;
  contentHeader?: ReactNode;
  children?: ReactNode;
}

/**
 * Renders base grid with aside and main content with their headers.
 */
export const UiBasePageLayout: FC<IProps> = ({
  aside,
  asideHeader,
  contentHeader,
  children,
}) => (
  <SMain>
    {aside && (
      <SAside fullWidth={!children}>
        <SHeader>{asideHeader}</SHeader>

        <SContent>{aside}</SContent>
      </SAside>
    )}

    {children && (
      <SMainPart>
        <SHeader>{contentHeader}</SHeader>

        <SContent>{children}</SContent>
      </SMainPart>
    )}
  </SMain>
);

const SMain = styled('main')`
  display: flex;
  overflow-y: scroll;
  height: 100dvh;
`;

const SAside = styled('aside', {
  shouldForwardProp: (prop) => prop !== 'fullWidth',
})<{ fullWidth: boolean }>(
  ({ fullWidth, theme }) => css`
    display: grid;
    grid-template-rows: ${theme.spacing(6)} auto;
    grid-template-columns: 1fr;
    width: ${fullWidth ? '100%' : 'max(35%, 400px)'};
    border-right: ${theme.palette.divider} 1px solid;
  `,
);

const SMainPart = styled('div')(
  ({ theme }) => css`
    display: grid;
    grid-template-rows: ${theme.spacing(6)} auto;
    grid-template-columns: 1fr;
    flex-grow: 1;
    width: 100%;
  `,
);

const SHeader = styled('header')(
  ({ theme }) => css`
    border-bottom: ${theme.palette.divider} 1px solid;
    display: flex;
    align-items: center;
    padding-inline: ${theme.spacing(2)};
  `,
);

const SContent = styled('div')`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
