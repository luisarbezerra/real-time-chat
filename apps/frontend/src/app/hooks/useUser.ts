import { User } from '@real-time-chat/shared';
import { useState, useEffect } from 'react';

const USER_STORAGE_KEY = 'chat_user';

export const useUser = (): {
  user: User;
  updateUsername: (name: string) => void;
} => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    return savedUser
      ? JSON.parse(savedUser)
      : { id: crypto.randomUUID(), name: '' };
  });

  useEffect(() => {
    if (user.name) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(user)]);

  const updateUsername = (name: string): void => {
    setUser((prev) => ({ ...prev, name }));
  };

  return {
    user,
    updateUsername,
  };
};
