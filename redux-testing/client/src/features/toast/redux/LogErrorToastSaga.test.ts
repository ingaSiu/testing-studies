import { logErrorToast, sendToAnalytics } from './LogErrorToastSaga';

import { ToastOptions } from '../types';
import { expectSaga } from 'redux-saga-test-plan';

const errorToastOptions: ToastOptions = {
  title: "It's time to panic!!!",
  status: 'error',
};

const errorToastAction = {
  type: 'test',
  payload: errorToastOptions,
};

test('saga calls analytics when it receives error toast', () => {
  return expectSaga(logErrorToast, errorToastAction).call(sendToAnalytics, "It's time to panic!!!").run();
});
