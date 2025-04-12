export const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat(navigator.language, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};
