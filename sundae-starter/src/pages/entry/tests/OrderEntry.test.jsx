import { HttpResponse, http } from 'msw';
import { logRoles, render, screen } from '@testing-library/react';

import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';

test('Handles errors for scoops and toppings routes', async () => {
  // reset handlers
  server.resetHandlers(
    http.get('http://localhost:3030/scoops', () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get('http://localhost:3030/toppings', () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  // const { container } =
  render(<OrderEntry />);

  // choosing with query to use:
  // get => we are expecting it to be there right away
  // query => we are expecting it not to be there right away
  // find => we expect it to be asynchronously

  const alerts = await screen.findAllByRole('alert');

  // using logRoles helps to troubleshoot
  // logRoles(container);

  expect(alerts).toHaveLength(2);
});
