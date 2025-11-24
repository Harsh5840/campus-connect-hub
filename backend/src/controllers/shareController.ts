import { Request, Response } from 'express';
import { generateShareMessage } from '../utils/shareMessage';

export class ShareController {
  static async generateMessage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
      const message = await generateShareMessage(id, baseUrl);
      res.json({ message });
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
