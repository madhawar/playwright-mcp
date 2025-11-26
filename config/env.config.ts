export const config = {
  web: {
    baseUrl: process.env.BASE_URL || 'https://practicesoftwaretesting.com', // https://practicesoftwaretesting.com
    timeout: 30000,
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://pokeapi.co/api/v2/', // https://pokeapi.co/docs/v2
    timeout: 10000,
  },
  users: {
    admin: {
      username: process.env.ADMIN_USER || 'admin@example.com',
      password: process.env.ADMIN_PASS || 'admin123',
    },
    regular: {
      username: process.env.USER || 'user@example.com',
      password: process.env.USER_PASS || 'user123',
    },
  },
};