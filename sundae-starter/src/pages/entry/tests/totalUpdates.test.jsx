import { render, screen } from '@testing-library/react';

import Options from '../Options';
import userEvent from '@testing-library/user-event';

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });

  expect(scoopsSubtotal).ToHaveTextContent('0.00');
  // update vanilla scoops to 1, and check subtotal

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).ToHaveTextContent('2.00');

  // update chocolate csoops to 2 and check subtotal

  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).ToHaveTextContent('6.00');
});