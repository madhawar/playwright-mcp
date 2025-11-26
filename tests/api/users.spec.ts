import { test, expect } from '../../fixtures/testFixtures';

test.describe('Users API Tests', () => {
  let createdUserId: number;

  test('should get all users', async ({ usersAPI }) => {
    const response = await usersAPI.getAllItems();
    await usersAPI.validateStatusCode(response, 200);
    
    const users = await usersAPI.getResponseBody(response);
    expect(Array.isArray(users)).toBeTruthy();
  });

  test('should create a new user', async ({ usersAPI }) => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
    };

    const response = await usersAPI.createUser(newUser);
    await usersAPI.validateStatusCode(response, 201);
    
    const user = await usersAPI.getResponseBody(response);
    createdUserId = user.id;
    expect(user.name).toBe(newUser.name);
    expect(user.email).toBe(newUser.email);
  });

  test('should get user by ID', async ({ usersAPI }) => {
    const response = await usersAPI.getItemById(1);
    await usersAPI.validateStatusCode(response, 200);
    
    const user = await usersAPI.getResponseBody(response);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
  });

  test('should update user', async ({ usersAPI }) => {
    const updatedData = { name: 'Jane Doe Updated' };
    
    const response = await usersAPI.updateUser(1, updatedData);
    await usersAPI.validateStatusCode(response, 200);
    
    const user = await usersAPI.getResponseBody(response);
    expect(user.name).toBe(updatedData.name);
  });

  test('should delete user', async ({ usersAPI }) => {
    const response = await usersAPI.deleteUser(1);
    await usersAPI.validateStatusCode(response, 204);
  });
});