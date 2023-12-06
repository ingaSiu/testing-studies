import { render, screen } from '@testing-library/react';

import App from '../App';
import { userEvent } from '@testing-library/user-event';

test('order phases for happy path', () => {
  // render app
  // add ice cream scoops and toppings
  // find and click order button
  // check summary information based on order
  // accept terms and conditions and click button to confirm order
  // confirm order number on confirmation page
  // click "new order" button on conformation page
  // check that scoops and toppings subtotal have been reset
  // do we need await anything to avaoid tests errors?
});
