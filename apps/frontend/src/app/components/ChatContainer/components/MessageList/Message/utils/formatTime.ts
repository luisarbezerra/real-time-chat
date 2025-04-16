export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};
