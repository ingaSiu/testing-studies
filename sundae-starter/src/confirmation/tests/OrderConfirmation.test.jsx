import { HttpResponse, http } from 'msw';
import { render, screen } from '../../test-utils/testing-library-utils';

import OrderConfirmation from '../OrderConfirmation';
import { server } from '../../mocks/server';

test('error response from server for submitting order', async () => {
  // override default msw response for options endpoint with error response
  server.resetHandlers(
    http.post('http://localhost:3030/order', () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  render(<OrderConfirmation />);

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent('An unexpected error occurred. Please try again later.');
});
