export const generateShareMessage = (listing: {
  title: string;
  price: number;
  condition: string;
  imageUrl?: string;
  qrUrl?: string;
}): string => {
  const { title, price, condition, imageUrl, qrUrl } = listing;
  let message = `Selling: ${title} | ₹${price} | Condition: ${condition}\n`;

  if (imageUrl) {
    message += `${imageUrl}\n`;
  }

  if (qrUrl) {
    message += `Scan to view: ${qrUrl}`;
  }

  return message;
};