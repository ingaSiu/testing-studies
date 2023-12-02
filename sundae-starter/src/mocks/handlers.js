import { HttpResponse, http, rest } from 'msw';

// export const handlers = [rest.get('http://localhost:3030/scoops', (req, res, ctx) => {})];

export const handlers = [
  http.get('http://localhost:3030/scoops', async () => {
    return HttpResponse.json([
      { name: 'Chocolate', imagePath: '/images/chocolate.png' },
      { name: 'Vanilla', imagePath: '/images/vanilla.png' },
    ]);
  }),
];
