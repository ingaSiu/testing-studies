import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';
import userEvent from '@testing-library/user-event';

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });

  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from server', async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });

  expect(toppingImages).toHaveLength(3);

  const imageTitles = toppingImages.map((img) => img.alt);
  expect(imageTitles).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});

test("don't update total if scoops input is invalid", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // wait for vanilla input to appear after server call
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

  // find scoops suntotal, which starts at 0
  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');

  // clear the input
  await user.clear(vanillaInput);

  // .type() will type one character at a time
  await user.type(vanillaInput, '-1');

  // make sute scoops subtotal hasn't updated
  expect(scoopsSubtotal).toHaveTextContent('$0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1.5');
  expect(scoopsSubtotal).toHaveTextContent('$0.00');

  await user.clear(vanillaInput);
  await user.type(vanillaInput, '150');
  expect(scoopsSubtotal).toHaveTextContent('$0.00');
});
