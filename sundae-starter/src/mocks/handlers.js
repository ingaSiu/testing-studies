import { HttpResponse, delay, http, rest } from 'msw';

// export const handlers = [rest.get('http://localhost:3030/scoops', (req, res, ctx) => {})];

export const handlers = [
  http.get('http://localhost:3030/scoops', () => {
    return HttpResponse.json([
      { name: 'Chocolate', imagePath: '/images/chocolate.png' },
      { name: 'Vanilla', imagePath: '/images/vanilla.png' },
    ]);
  }),

  http.get('http://localhost:3030/toppings', () => {
    return HttpResponse.json([
      { name: 'Cherries', imagePath: '/images/cherries.png' },
      { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
      { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
    ]);
  }),

  http.post('http://localhost:3030/order', async () => {
    await delay(400);
    return HttpResponse.json({ orderNumber: 123455676 }, { status: 201 });
  }),
];
