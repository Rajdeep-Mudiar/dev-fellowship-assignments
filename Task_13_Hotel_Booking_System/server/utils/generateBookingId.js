/**
 * Generates human-friendly booking reference like "QS-847291"
 */
export const generateBookingId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `QS-${randomNum}`;
};
