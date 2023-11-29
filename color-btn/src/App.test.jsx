import { render, screen } from '@testing-library/react';

import App from './App';

// render method:
// creates simulated DOM for argument component
// once rendered simulated DOM can be accessed via global object called screen
// getByText - is a method from screen (it is looking at simulated DOM and trying to find an element
// what matches the text that we give it)

test('App contains correct heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /learn react/i });

  // assertion which determines if test pass or fail
  // (linkElement) - expect argument(subject of the assertion)
  // .toBeInTheDocument() - matcher (type of assertion), it can have argument which refines matcher
  expect(headingElement).toBeInTheDocument();
});

// /learn react/i - this is a regular expression (i means case insensitive )
// with regulat expression it can be partial match
// but if string is used it has to be an exact match
