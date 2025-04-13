import { useState, useEffect } from 'react';
import { User } from '@real-time-chat/shared';

const USER_STORAGE_KEY = 'chat_user';

export const useUser = () => {
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
  }, [user]);

  const updateUsername = (name: string) => {
    setUser((prev) => ({ ...prev, name }));
  };

  return {
    user,
    updateUsername,
  };
};
