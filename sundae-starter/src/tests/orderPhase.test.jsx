import { render, screen } from '@testing-library/react';

import App from '../App';
import { userEvent } from '@testing-library/user-event';

test('order phases for happy path', async () => {
  const user = userEvent.setup();
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });
  expect(grandTotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');

  const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
  await user.click(cherriesCheckbox);
  expect(grandTotal).toHaveTextContent('3.50');

  // find and click order summary button
  const orderSummaryBtn = screen.getByRole('button', { name: /order sundae/i });
  await user.click(orderSummaryBtn);

  // check summary information based on order
  // accept terms and conditions and click button to confirm order
  // confirm order number on confirmation page
  // click "new order" button on conformation page
  // check that scoops and toppings subtotal have been reset
  // do we need await anything to avaoid tests errors?
});
