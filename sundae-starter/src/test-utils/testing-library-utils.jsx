import { OrderDetailsProvider } from '../contexts/OrderDetails';
import { render } from '@testing-library/react';

// ui => a standart way to refer to jsx you are going to render

const renderWithContext = (ui, options) => render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything

export * from '@testing-library/react';

// override render method

export { renderWithContext as render };
