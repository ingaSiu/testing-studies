import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';
import { kebabCaseToTitleCase } from './helpers';

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
  expect(buttonElement).toHaveClass('medium-violet-red');

  //click the btn
  fireEvent.click(buttonElement);

  // check the btn color
  expect(buttonElement).toHaveClass('midnight-blue');

  //check the btn
  expect(buttonElement).toHaveTextContent(/red/i);
});

test('checkbox flow', () => {
  render(<App />);

  const buttonElement = screen.getByRole('button', { name: /blue/i });
  const checkboxElement = screen.getByRole('checkbox', { name: /disable button/i });

  // check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // click checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(checkboxElement).toBeChecked();
  expect(buttonElement).toHaveClass('gray');

  // click checkbox to re-enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toHaveClass('medium-violet-red');
});

test('checkbox flow after button click', () => {
  render(<App />);

  const buttonElement = screen.getByRole('button', {
    name: /blue/i,
  });
  const checkboxElement = screen.getByRole('checkbox', {
    name: /disable button/i,
  });

  // click btn to change to blue
  fireEvent.click(buttonElement);

  // click checkbox to disable btn
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass('gray');

  // click checkbox to re-enable btn
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass('midnight-blue');
});

// a way to group multiple tests in the second argument function

describe('kebabCaseToTitleCase', () => {
  test('works for no hyphens', () => {
    expect(kebabCaseToTitleCase('red')).toBe('Red');
  });
  test('works for one hyphen', () => {
    expect(kebabCaseToTitleCase('midnight-blue')).toBe('Midnight Blue');
  });
  test('works for multiple hyphens', () => {
    expect(kebabCaseToTitleCase('medium-violet-red')).toBe('Medium Violet Red');
  });
});
