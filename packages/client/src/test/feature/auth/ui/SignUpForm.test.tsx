import 'cross-fetch/polyfill';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import { RegisterInput } from 'api';

import { AuthUi } from 'feature';
import { accessTokenProvider } from 'shared';

const firstName = faker.person.firstName('male');
const lastName = faker.person.lastName('male');
const login = faker.internet.userName({ firstName, lastName });
const password = faker.internet.password({ length: 6 });
const accessToken = 'access-token';

describe('Sign up form feature', () => {
  it('should render sign up form and sign user up', async () => {
    const { getByRole, getByLabelText } = render(
      <MockedProvider mocks={[signUpMutationMock]} addTypename={false}>
        <AuthUi.SignUp />
      </MockedProvider>,
    );

    const form = getByRole('form') as HTMLFormElement;
    const [loginInput, firstNameInput, lastNameInput, passwordInput] =
      (await Promise.all([
        getByLabelText('Login'),
        getByLabelText('First name'),
        getByLabelText('Last name'),
        getByLabelText('Password'),
      ])) as [
        HTMLInputElement,
        HTMLInputElement,
        HTMLInputElement,
        HTMLInputElement,
      ];
    const submitButton = getByRole('button');

    expect(form).toBeTruthy();
    expect(loginInput).toBeTruthy();
    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();

    await waitFor(async () => {
      await userEvent.click(loginInput);
      await userEvent.keyboard(login);
      await userEvent.click(firstNameInput);
      await userEvent.keyboard(firstName);
      await userEvent.click(lastNameInput);
      await userEvent.keyboard(lastName);
      await userEvent.click(passwordInput);
      await userEvent.keyboard(password);

      expect(loginInput.value).toBe(login);
      expect(firstNameInput.value).toBe(firstName);
      expect(lastNameInput.value).toBe(lastName);
      expect(passwordInput.value).toBe(password);

      await userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(accessTokenProvider.get()).toBe(accessToken);
    });
  });
});

const signUpMutationMock: MockedResponse<
  { register: string },
  { input: RegisterInput }
> = {
  request: {
    query: gql`
      mutation SignUp($input: RegisterInput!) {
        register(input: $input)
      }
    `,
    variables: { input: { login, password, firstName, lastName } },
  },
  result: {
    data: {
      register: accessToken,
    },
  },
};
