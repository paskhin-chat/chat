import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';

import { AuthUi } from '../../../../main/features';
import {
  AuthManagerContext,
  config,
  createAuthManager,
  createLocalStorageAdapter,
  createRequestManager,
  createValueAccessor,
  LocalStorageKey,
  RequestManagerContext,
} from '../../../../main/shared';

const firstName = faker.person.firstName('male');
const lastName = faker.person.lastName('male');
const login = faker.internet.userName({ firstName, lastName });
const password = faker.internet.password({ length: 6 });
const accessToken = 'access-token';

global.fetch = jest.fn();

describe('Sign up form feature', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render sign up form and sign user up', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => ({
          data: {
            register: accessToken,
          },
        }),
      }),
    );

    const authManager = createAuthManager({
      apiGqlUri: config.apiGqlUri,
      accessTokenAccessor: createValueAccessor(createLocalStorageAdapter(), LocalStorageKey.ACCESS_TOKEN),
    });
    const requestManager = createRequestManager({
      authManager,
      config,
    });

    const { getByRole, getByLabelText } = render(
      <AuthManagerContext.Provider value={authManager}>
        <RequestManagerContext.Provider value={requestManager}>
          <AuthUi.SignUp />
        </RequestManagerContext.Provider>
      </AuthManagerContext.Provider>,
    );

    const form = getByRole('form') as HTMLFormElement;
    const [loginInput, firstNameInput, lastNameInput, passwordInput] = (await Promise.all([
      getByLabelText('Login'),
      getByLabelText('First name'),
      getByLabelText('Last name'),
      getByLabelText('Password'),
    ])) as [HTMLInputElement, HTMLInputElement, HTMLInputElement, HTMLInputElement];
    const submitButton = getByRole('button');

    expect(form).toBeTruthy();
    expect(loginInput).toBeTruthy();
    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();

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

    expect(authManager.accessToken).toBe(accessToken);
  });
});
