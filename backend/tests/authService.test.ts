import { AuthService } from '../src/services/authService';
import { PrismaClient } from '../src/generated';

const prisma = new PrismaClient();

describe('AuthService', () => {
  beforeAll(async () => {
    // Connect to test database
    await prisma.$connect();
  });

  afterAll(async () => {
    // Clean up and disconnect
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        phoneNumber: '1234567890',
        campus: 'Test Campus',
        hostel: 'Test Hostel',
      };

      const result = await AuthService.register(userData);

      expect(result.user).toHaveProperty('id');
      expect(result.user.email).toBe(userData.email);
      expect(result.user.name).toBe(userData.name);
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw error for existing email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User 2',
      };

      await expect(AuthService.register(userData)).rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    it('should login with correct credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await AuthService.login(loginData);

      expect(result.user.email).toBe(loginData.email);
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw error for invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      await expect(AuthService.login(loginData)).rejects.toThrow('Invalid credentials');
    });
  });
});