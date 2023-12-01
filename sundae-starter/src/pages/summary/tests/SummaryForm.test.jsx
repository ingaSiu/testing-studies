import { fireEvent, render, screen } from '@testing-library/react';

import SummaryForm from '../SummaryForm';

test('Initial conditions', () => {
  render(<SummaryForm />);

  const checkboxElement = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const buttonElement = screen.getByRole('button', { name: /confirm order/i });

  expect(buttonElement).toBeDisabled();
  expect(checkboxElement).not.toBeChecked();
});

test('Checkbox enables button on first click and disables on second click', () => {
  render(<SummaryForm />);

  const checkboxElement = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const buttonElement = screen.getByRole('button', { name: /confirm order/i });

  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).toBeChecked();

  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
});
