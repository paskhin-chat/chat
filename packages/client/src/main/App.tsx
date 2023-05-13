import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Input } from 'ui';

/**
 * App root.
 */
export const App: FC = () => (
  <SWrapper>
    <Button>Click me</Button>
    <Input />
  </SWrapper>
);

const SWrapper = styled.div`
  height: 100%;
  background-color: red;
`;
