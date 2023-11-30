import { render, screen } from '@testing-library/react';

import App from './App';

// import { logRoles } from '@testing-library/react';

// logRoles - This helper function can be used to print out a list of all the implicit ARIA
//roles within a tree of DOM nodes, each role containing a list of all of the nodes which
// match that role
// example:  const { container } = render(<App />);
// logRoles(container);
test('button starts with correct color', () => {
  render(<App />);

  const buttonElement = screen.getByRole('button', { name: /blue/i });

  expect(buttonElement).toHaveClass('red');
});

test('button starts with correct text', () => {});

test('button has correct colorv after click', () => {});

test('button has correct text after click', () => {});
