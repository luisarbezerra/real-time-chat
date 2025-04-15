import './TypingIndicator.scss';
import { User } from '@real-time-chat/shared';

type TypingIndicatorProps = {
  typingUsers: User[];
  currentUserId: string;
};

export const TypingIndicator = ({
  typingUsers,
  currentUserId,
}: TypingIndicatorProps) => {
  const filteredUsers = typingUsers.filter((user) => user.id !== currentUserId);

  if (filteredUsers.length === 0) return null;

  const getTypingText = () => {
    if (filteredUsers.length === 1) {
      return `${filteredUsers[0].name} is typing...`;
    }
    if (filteredUsers.length === 2) {
      return `${filteredUsers[0].name} and ${filteredUsers[1].name} are typing...`;
    }
    return `${filteredUsers[0].name} and ${
      filteredUsers.length - 1
    } others are typing...`;
  };

  return (
    <div className="typing-indicator" data-testid="typing-indicator">
      <em>{getTypingText()}</em>
    </div>
  );
};
