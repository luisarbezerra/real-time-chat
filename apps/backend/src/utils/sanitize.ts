import xss from 'xss';

export const xssOptions = {
  whiteList: {}, // empty whitelist means no tags are allowed
  stripIgnoreTag: true, // strip HTML tags not in whitelist
  stripIgnoreTagBody: ['script'], // strip script tags and their content
};

export const sanitizeText = (text: string): string => {
  return xss(text, xssOptions);
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
