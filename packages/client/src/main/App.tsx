import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Input } from 'ui';
import { config } from 'config';

/**
 * App root.
 */
export const App: FC = () => (
  <SWrapper>
    <Button>{`Click me - ${config.API_PORT}`}</Button>
    <Input />
  </SWrapper>
);

const SWrapper = styled.div`
  height: 100%;
  background-color: red;
`;
