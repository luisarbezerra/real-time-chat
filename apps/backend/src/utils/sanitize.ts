import xss from 'xss';

export const sanitizeText = (text: string): string => {
  return xss(text);
};

export const sanitizeUser = (user: { name: string; id: string }) => {
  return {
    ...user,
    name: sanitizeText(user.name),
  };
};

export const sanitizeMessage = (message: {
  text: string;
  user: { name: string; id: string };
}) => {
  return {
    ...message,
    text: sanitizeText(message.text),
    user: sanitizeUser(message.user),
  };
};
