import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';

// import { logRoles } from '@testing-library/react';

// logRoles - This helper function can be used to print out a list of all the implicit ARIA
//roles within a tree of DOM nodes, each role containing a list of all of the nodes which
// match that role
// example:  const { container } = render(<App />);
// logRoles(container);

test('button click flow', () => {
  //render app
  render(<App />);

  //find the btn
  const buttonElement = screen.getByRole('button', { name: /blue/i });

  // check initial color
  expect(buttonElement).toHaveClass('red');

  //click the btn
  fireEvent.click(buttonElement);

  //check the btn
  expect(buttonElement).toHaveTextContent(/red/i);

  // check the btn color
  expect(buttonElement).toHaveClass('blue');
});

test('checkbox flow', () => {
  render(<App />);

  const buttonElement = screen.getByRole('button', { name: /blue/i });
  const checkboxElement = screen.getByRole('checkbox', { name: /disable button/i });

  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  fireEvent.click(checkboxElement);

  expect(buttonElement).toBeDisabled();
  expect(checkboxElement).toBeChecked();

  fireEvent.click(checkboxElement);

  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();
});
