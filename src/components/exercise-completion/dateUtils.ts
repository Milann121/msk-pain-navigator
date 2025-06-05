
// Helper function to check if it's a new day
export const isNewDay = (lastDate: Date, currentDate: Date) => {
  return lastDate.toDateString() !== currentDate.toDateString();
};

// Helper function to get today's start time (00:00)
export const getTodayStart = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
