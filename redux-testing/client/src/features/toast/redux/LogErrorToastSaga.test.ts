import { logErrorToast, sendToAnalytics } from './logErrorToastSaga';

import { ToastOptions } from '../types';
import { expectSaga } from 'redux-saga-test-plan';

const errorToastOptions: ToastOptions = {
  title: "It's time to panic!",
  status: 'error',
};

const errorToastAction = {
  type: 'test',
  payload: errorToastOptions,
};

describe('Log error Toast tests', () => {
  test('saga calls analytics when it receives error toast', () => {
    return expectSaga(logErrorToast, errorToastAction).call(logErrorToast, "It's time to panic!").run();
  });
});
