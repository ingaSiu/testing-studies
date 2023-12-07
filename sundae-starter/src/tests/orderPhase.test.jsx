import { render, screen } from '@testing-library/react';

import App from '../App';
import { userEvent } from '@testing-library/user-event';

test('Order phases for happy path', async () => {
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

  // check summary subtotals
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $2.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  // alternatively:
  // const optionItems = screen.getAllByRole("listitem");
  // const optionItemsText = optionItems.map((item) => item.textContent);
  // expect(optionItemsText).toEqual(['1 Vanilla', "Cherries"])

  // accept terms and conditions and click button to confirm order
  const cofirmOrderBtn = screen.getByRole('button', { name: /confirm order/i });
  expect(cofirmOrderBtn).toBeDisabled();

  const tcCheckBox = screen.getByRole('checkbox', { name: /I agree to terms and conditions/i });
  await user.click(tcCheckBox);

  // confirm order number on confirmation page
  expect(cofirmOrderBtn).toBeEnabled();
  await user.click(cofirmOrderBtn);

  // Expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // check confirmation page text
  // this one is async because there is a POST request to server in between summary
  // and comfirmations pages

  const thankYouHeader = await screen.findByRole('heading', { name: /thank you/i });
  expect(thankYouHeader).toBeInTheDocument();

  // expect that loading has disappeared
  const notLoading = screen.queryByText('loading');
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click "new order" button on conformation page
  const newOrderBtn = screen.getByRole('button', { name: /create new order/i });
  await user.click(newOrderBtn);

  // check that scoops and toppings subtotal have been reset
  const scoopsTotal = await screen.findByText('Scoops total: $0.00');
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = await screen.findByText('Toppings total: $0.00');
  expect(toppingsTotal).toBeInTheDocument();
});
