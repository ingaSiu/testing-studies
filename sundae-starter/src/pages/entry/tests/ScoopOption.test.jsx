import { render, screen } from '../../../test-utils/testing-library-utils';

import ScoopOption from '../ScoopOption';
import { userEvent } from '@testing-library/user-event';

test('Indicate if scoop count is non-int or out of range', async () => {
  const user = userEvent.setup();
  // if using add, need to add props to rendered component
  render(<ScoopOption />);

  // expect input to be invalid with negative number
  const vanillaInput = screen.getByRole('spinbutton');
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '-1');
  expect(vanillaInput).toHaveClass('is-invalid');

  // replace with decimal input
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1.5');
  expect(vanillaInput).toHaveClass('is-invalid');

  // replace with input that's too high
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '25');
  expect(vanillaInput).toHaveClass('is-invalid');

  // replace with valid input
  // note: here we're testing our validation rules (namely that the input can display as valid)
  // and not react-bootstrap's response

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '2');
  expect(vanillaInput).not.toHaveClass('is-invalid');
});
