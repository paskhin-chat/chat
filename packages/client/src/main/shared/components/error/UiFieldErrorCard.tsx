import React from 'react';
import { FieldRenderer } from '@roqueform/react';
import styled from 'styled-components';

import type { IUiField } from '../field';

interface IProps {
  field: IUiField<unknown>;
}

/**
 * Component for rendering field's error in card view.
 */
export const UiFieldErrorCard: React.VFC<IProps> = ({ field }) => (
  <FieldRenderer field={field}>
    {() => field.error && <SCard>{field.error.message}</SCard>}
  </FieldRenderer>
);

const SCard = styled.div`
  background-color: red;
  padding: 0.5rem;
  color: white;
`;
