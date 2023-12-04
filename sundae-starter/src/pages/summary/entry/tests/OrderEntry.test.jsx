import { HttpResponse, http, rest } from 'msw';
import { render, screen } from '@testing-library/react';

import OrderEntry from '../OrderEntry';
import { server } from '../../../../mocks/server';

test('Handles errors for scoops and toppings routes', () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', () => {
      return new HttpResponse(null, { status: 500 });
    }),
    rest.get('http://localhost:3030/toppings', () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );
});
