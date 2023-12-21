import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';

import {
  MessageDto,
  config,
  createAuthManager,
  createLocalStorageAdapter,
  createRequestManager,
  createValueAccessor,
  IGqlResponse,
  LocalStorageKey,
  RequestManagerContext,
} from '../../../../main/shared';
import { MessageUi } from '../../../../main/features';

const roomId = faker.string.uuid();
const content = faker.word.words();

global.fetch = jest.fn();

describe('Message form feature', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render message form and create a message', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => mockResponse,
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

    const handleSubmittedMock = jest.fn();

    const { getByRole } = render(
      <RequestManagerContext.Provider value={requestManager}>
        <MessageUi.CreateMessage roomId={roomId} onSubmitted={handleSubmittedMock} />
      </RequestManagerContext.Provider>,
    );

    const form = getByRole('form') as HTMLFormElement;
    const messageContentInput = getByRole('textbox') as HTMLInputElement;
    const submitButton = getByRole('button');

    expect(form).toBeTruthy();
    expect(messageContentInput).toBeTruthy();
    expect(submitButton).toBeTruthy();

    await waitFor(async () => {
      await userEvent.click(messageContentInput);
      await userEvent.keyboard(content);

      expect(messageContentInput.value).toBe(content);

      await userEvent.click(submitButton);
    });

    expect(handleSubmittedMock).toHaveBeenCalled();
  });
});

const mockResponse: IGqlResponse<{ createMessage: MessageDto }> = {
  data: {
    createMessage: {
      __typename: 'MessageDto',
      id: faker.string.uuid(),
      content,
      sendTime: faker.date.past().toISOString(),
      roomId,
      user: {
        __typename: 'UserDto',
        id: faker.string.uuid(),
        login: faker.internet.userName(),
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        secondName: faker.person.middleName(),
      },
    },
  },
};
