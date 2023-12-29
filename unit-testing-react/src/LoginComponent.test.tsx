import { getByRole, render, screen } from '@testing-library/react';

import LoginComponent from './LoginComponent';

// const linkElement = screen.getByText(/learn react/i);
// expect(linkElement).toBeInTheDocument();

describe('Login component tests', () => {
  const loginServiceMock = {
    login: jest.fn(),
  };

  const setTokenMock = jest.fn();

  it('should render correctly login component', () => {
    const container = render(<LoginComponent loginService={loginServiceMock} setToken={setTokenMock} />).container;
    console.log(container.innerHTML);

    const mainElement = screen.getByRole('main');

    expect(mainElement).toBeInTheDocument();
  });
});
