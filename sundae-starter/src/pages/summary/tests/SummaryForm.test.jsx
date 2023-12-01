import { fireEvent, render, screen } from '@testing-library/react';

import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('Initial conditions', () => {
  render(<SummaryForm />);

  const checkboxElement = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const buttonElement = screen.getByRole('button', { name: /confirm order/i });

  expect(buttonElement).toBeDisabled();
  expect(checkboxElement).not.toBeChecked();
});

test('Checkbox enables button on first click and disables on second click', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const checkboxElement = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const buttonElement = screen.getByRole('button', { name: /confirm order/i });

  await user.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).toBeChecked();

  await user.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
});

test('popover responds to hover', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  // popover starts out hidden (is not in the document)
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();
  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  // popover desappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
