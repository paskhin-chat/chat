import { FieldRenderer } from '@roqueform/react';
import { FC } from 'react';
import styled from 'styled-components';

import type { IUiField } from '../field';

interface IProps {
  field: IUiField<unknown>;
}

/**
 * Component for render caption for errored field.
 */
export const UiFieldErrorHelper: FC<IProps> = ({ field }) => (
  <FieldRenderer field={field}>
    {() => field.error && <SHelper>{field.error.message}</SHelper>}
  </FieldRenderer>
);

const SHelper = styled.span`
  color: red;
  font-size: 0.85rem;
`;
