import { User } from '@real-time-chat/shared';
import { sanitizeUser } from '../utils/sanitize';
import { logger } from '../utils/logger';

export class UserService {
  private typingUsers = new Map<User['id'], User>();

  addTypingUser(user: User): User[] {
    if (user?.id && user?.name) {
      const sanitizedUser = sanitizeUser(user);
      this.typingUsers.set(sanitizedUser.id, sanitizedUser);
      logger.log(`User ${sanitizedUser.name} started typing`);
    } else {
      logger.error('Invalid user data for typing');
    }

    return this.getTypingUsers();
  }

  removeTypingUser(userId: User['id']): User[] {
    if (this.typingUsers.has(userId)) {
      this.typingUsers.delete(userId);
      logger.log(`User ${userId} stopped typing`);
    } else {
      logger.error(`User ${userId} not found in typing list`);
    }

    return this.getTypingUsers();
  }

  getTypingUsers(): User[] {
    const users = Array.from(this.typingUsers.values());
    logger.log(`${users.length} users currently typing`);
    return users;
  }
}
