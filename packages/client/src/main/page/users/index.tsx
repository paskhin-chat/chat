import { FC } from 'react';
import styled from 'styled-components';

import { UsersUi } from 'feature';

const UsersPage: FC = () => (
  <SPageWrapper>
    <STitle>Users</STitle>

    <UsersUi.UserList />
  </SPageWrapper>
);

/**
 * Users page.
 */
export default UsersPage;

const SPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: gray;
  min-height: 100vh;
  padding: 20px;
`;

const STitle = styled.h2``;
