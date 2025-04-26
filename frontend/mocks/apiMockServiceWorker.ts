import { setupWorker, rest } from 'msw';

const worker = setupWorker(
  rest.get('/api/resumes', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          title: 'Software Engineer',
          content: 'Experienced software engineer with a focus on backend development.',
        },
        {
          id: 2,
          title: 'Frontend Developer',
          content: 'Skilled frontend developer with expertise in React and TypeScript.',
        },
      ]),
    );
  }),

  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;

    if (email === 'user@example.com' && password === 'password123') {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          email: 'user@example.com',
          token: 'mock-jwt-token',
        }),
      );
    }

    return res(
      ctx.status(401),
      ctx.json({
        error: 'Invalid credentials',
      }),
    );
  }),

  rest.post('/api/auth/register', (req, res, ctx) => {
    const { email, password } = req.body;

    if (email && password) {
      return res(
        ctx.status(201),
        ctx.json({
          id: 2,
          email,
          token: 'mock-jwt-token',
        }),
      );
    }

    return res(
      ctx.status(400),
      ctx.json({
        error: 'Invalid data',
      }),
    );
  }),
);

worker.start();
