import { Router } from 'express';
import { ListingService } from '../services/listingService';
import { generateShareMessage } from '../utils/shareMessage';

const router = Router();

router.get('/generate-message/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await ListingService.getListingById(id);

    const message = generateShareMessage({
      title: listing.title,
      price: listing.price,
      condition: listing.condition,
      imageUrl: listing.imageUrls[0] || '',
      qrUrl: listing.qrUrl || '',
    });

    res.json({ message });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

export default router;