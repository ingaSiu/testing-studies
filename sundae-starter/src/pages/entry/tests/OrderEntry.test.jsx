import { HttpResponse, http } from 'msw';
import { logRoles, render, screen } from '../../../test-utils/testing-library-utils';

import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

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

test('Disable order button for no scoops', async () => {
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={vi.fn()} />);

  const orderButton = screen.getByRole('button', { name: /order sundae/i });

  // check if disabled
  expect(orderButton).toBeDisabled();

  // order a scoop to check if enabled after ordering
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  expect(orderButton).toBeEnabled();

  // remove order to see if it become disabled
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();
});
