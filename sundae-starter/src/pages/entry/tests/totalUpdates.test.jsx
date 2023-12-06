import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';
import OrderEntry from '../OrderEntry';
import userEvent from '@testing-library/user-event';

// we test an isolated component so in order to get context here in tests we need to wrap it with context
// you can wrap it in redux provider, router etc
//   render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

test('update scoop subtotal when scoops change', async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });

  expect(scoopsSubtotal).toHaveTextContent('0.00');
  // update vanilla scoops to 1, and check subtotal

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal

  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
  await user.click(cherriesCheckbox);

  expect(toppingsSubtotal).toHaveTextContent('1.50');
  expect(cherriesCheckbox).toBeChecked();

  const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
  await user.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  await user.click(hotFudgeCheckbox);
  expect(hotFudgeCheckbox).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });
    expect(grandTotal).toHaveTextContent('0.00');
  });

  test('grand total updates properly if scoop is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');
    expect(grandTotal).toHaveTextContent('4.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });

  test('grand total updates properly if topping is added first', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('1.50');

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if item is removed', async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total: \$/i });

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    await user.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '2');

    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');

    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
