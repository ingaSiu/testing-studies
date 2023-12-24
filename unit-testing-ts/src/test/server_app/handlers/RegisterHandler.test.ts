import { IncomingMessage, ServerResponse } from 'http';

import { Authorizer } from '../../../app/server_app/auth/Authorizer';
import { RegisterHandler } from '../../../app/server_app/handlers/RegisterHandler';

describe('RegisterHandler test suite', () => {
  let sut: RegisterHandler;

  const request = {
    metdod: undefined,
  };

  const responseMock = {
    statusCode: 0,
    writeHead: jest.fn(),
    write: jest.fn(),
  };

  const authorizerMock = {
    registerUser: jest.fn(),
  };

  beforeEach(() => {
    sut = new RegisterHandler(
      request as unknown as IncomingMessage,
      responseMock as any as ServerResponse,
      authorizerMock as any as Authorizer,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
