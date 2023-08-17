import 'cross-fetch/polyfill';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import { LoginInput } from 'api';

import { AuthUi } from 'feature';
import { accessTokenProvider } from 'shared';

const login = faker.internet.userName({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
});
const password = faker.internet.password({ length: 6 });
const accessToken = 'access-token';

describe('Login form feature', () => {
  it('should render login form and log user in', async () => {
    const { getByRole, getByLabelText } = render(
      <MockedProvider mocks={[loginMutationMock]} addTypename={false}>
        <AuthUi.Login />
      </MockedProvider>,
    );

    const form = getByRole('form') as HTMLFormElement;
    const [loginInput, passwordInput] = (await Promise.all([
      getByLabelText('Login'),
      getByLabelText('Password'),
    ])) as [HTMLInputElement, HTMLInputElement];
    const submitButton = getByRole('button');

    expect(form).toBeTruthy();
    expect(loginInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();

    await waitFor(async () => {
      await userEvent.click(loginInput);
      await userEvent.keyboard(login);
      await userEvent.click(passwordInput);
      await userEvent.keyboard(password);

      expect(loginInput.value).toBe(login);
      expect(passwordInput.value).toBe(password);

      await userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(accessTokenProvider.get()).toBe(accessToken);
    });
  });
});

const loginMutationMock: MockedResponse<
  { login: string },
  { input: LoginInput }
> = {
  request: {
    query: gql`
      mutation Login($input: LoginInput!) {
        login(input: $input)
      }
    `,
    variables: { input: { login, password } },
  },
  result: {
    data: {
      login: accessToken,
    },
  },
};
