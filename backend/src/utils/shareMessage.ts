import { prisma } from '../lib/prisma';

export const generateShareMessage = async (listingId: string, baseUrl: string): Promise<string> => {
  const listing = await prisma.listing.findUnique({
    where: { id: listingId, isDeleted: false },
    include: { seller: { select: { name: true, hostel: true } } },
  });

  if (!listing) {
    throw new Error('Listing not found');
  }

  const listingUrl = `${baseUrl}/listings/${listing.id}`;
  
  let message = `🛍️ *${listing.title}*\n\n`;
  message += `💰 Price: ₹${listing.price}\n`;
  message += `📦 Condition: ${listing.condition}\n`;
  message += `📍 Location: ${listing.location || 'Campus'}\n`;
  
  if (listing.description) {
    message += `\n📝 ${listing.description}\n`;
  }
  
  if (listing.seller) {
    message += `\n👤 Seller: ${listing.seller.name}`;
    if (listing.seller.hostel) {
      message += ` (${listing.seller.hostel})`;
    }
    message += `\n`;
  }
  
  message += `\n🔗 View full details: ${listingUrl}`;
  
  return message;
};