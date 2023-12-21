import { FC, ReactNode } from 'react';
import { css, styled } from '@mui/material/styles';
import { IconButton, Theme, useMediaQuery } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';

interface IProps {
  aside?: ReactNode;
  content?: ReactNode;
  mobilePriorityPart?: 'aside' | 'content';
}

/**
 * Renders base grid with aside and main content with their headers.
 */
export const UiBasePageLayout: FC<IProps> = ({ aside, content, mobilePriorityPart }) => {
  const smUpper = useMediaQuery<Theme>(theme => theme.breakpoints.up('sm'));

  const asideShown = smUpper || mobilePriorityPart === 'aside';
  const containShown = smUpper || mobilePriorityPart === 'content';

  return (
    <SMain>
      {asideShown && aside}

      {containShown && content}
    </SMain>
  );
};

interface IUiBasePageLayoutAsideProps {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}

export const UiBasePageLayoutAside: FC<IUiBasePageLayoutAsideProps> = ({ header, children, footer }) => (
  <SAside>
    <SHeader>{header}</SHeader>

    <SContent>{children}</SContent>

    <SFooter>{footer}</SFooter>
  </SAside>
);

interface IUiBasePageLayoutContentProps {
  header: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onGoBack?: () => void;
}

export const UiBasePageLayoutContent: FC<IUiBasePageLayoutContentProps> = ({ header, children, footer, onGoBack }) => (
  <SMainPart full={!footer}>
    <SHeader>
      {onGoBack && (
        <IconButton onClick={onGoBack}>
          <ArrowBackIosNew />
        </IconButton>
      )}

      {header}
    </SHeader>

    <SContent>{children}</SContent>

    {footer && <SFooter>{footer}</SFooter>}
  </SMainPart>
);

const SMain = styled('main')`
  display: flex;
  overflow-y: scroll;
  height: 100dvh;
`;

const SAside = styled('aside')(
  ({ theme }) => css`
    display: grid;
    grid-template-rows: ${theme.spacing(8)} auto ${theme.spacing(8)};
    grid-template-columns: 1fr;
    width: 100%;
    border-right: ${theme.palette.divider} 1px solid;

    ${theme.breakpoints.up('sm')} {
      width: max(35%, 400px);
    }
  `,
);

const SMainPart = styled('div', {
  shouldForwardProp: propName => propName !== 'full',
})<{ full: boolean }>(
  ({ theme, full }) => css`
    display: grid;
    height: 100dvh;
    grid-template-rows: ${full ? `${theme.spacing(8)} auto` : `${theme.spacing(8)} auto ${theme.spacing(8)}`};
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
    column-gap: ${theme.spacing(1)};
  `,
);

const SFooter = styled('footer')(
  ({ theme }) => css`
    border-top: ${theme.palette.divider} 1px solid;
    display: flex;
    align-items: center;
    padding-inline: ${theme.spacing(2)};
  `,
);

const SContent = styled('div')`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
