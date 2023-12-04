import { HttpResponse, rest } from 'msw';
import { render, screen } from '@testing-library/react';

import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';

test('Handles errors for scoops and toppings routes', async () => {
  // reset handlers
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', () => {
      return new HttpResponse(null, { status: 500 });
    }),
    rest.get('http://localhost:3030/toppings', () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  render(<OrderEntry />);

  // choosing with query to use:
  // get => we are expecting it to be there right away
  // query => we are expecting it not to be there right away
  // find => we expevt it to be asynchronously

  const alerts = await screen.findAllByRole('alert', { name: 'An unexpected error occurred. Please try again later.' });

  expect(alerts).toHaveLength(2);
});
