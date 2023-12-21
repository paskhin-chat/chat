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

const login = faker.internet.userName({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
});
const password = faker.internet.password({ length: 6 });
const accessToken = 'access-token';

global.fetch = jest.fn();

describe('Login form feature', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login form and log user in', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => ({
          data: {
            login: accessToken,
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
          <AuthUi.Login />
        </RequestManagerContext.Provider>
      </AuthManagerContext.Provider>,
    );

    const form = getByRole('form') as HTMLFormElement;
    const [loginInput, passwordInput] = (await Promise.all([getByLabelText('Login'), getByLabelText('Password')])) as [
      HTMLInputElement,
      HTMLInputElement,
    ];
    const submitButton = getByRole('button');

    expect(form).toBeTruthy();
    expect(loginInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();

    await userEvent.click(loginInput);
    await userEvent.keyboard(login);
    await userEvent.click(passwordInput);
    await userEvent.keyboard(password);

    expect(loginInput.value).toBe(login);
    expect(passwordInput.value).toBe(password);

    await userEvent.click(submitButton);

    expect(authManager.accessToken).toBe(accessToken);
  });
});
