import { Request, Response } from 'express';
import passport from 'passport';
import { AuthService } from '../services/authService';
import { AuthRequest } from '../middleware/auth';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const tokens = await AuthService.refreshToken(refreshToken);
      res.json(tokens);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  static googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

  static googleAuthCallback = passport.authenticate('google', { failureRedirect: '/auth/login' });

  static async googleAuthSuccess(req: AuthRequest, res: Response) {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
      }

      const { generateTokens } = await import('../middleware/auth');
      const tokens = generateTokens(user.id);

      res.json({ user, ...tokens });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await AuthService.getUserById(req.user!.id);
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const user = await AuthService.updateUser(req.user!.id, req.body);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllUsers(req: AuthRequest, res: Response) {
    try {
      const users = await AuthService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      await AuthService.deleteUser(userId);
      res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}