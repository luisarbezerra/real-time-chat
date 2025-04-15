import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import './ConnectionIndicator.scss';

type ConnectionIndicatorProps = {
  isConnected: boolean;
};

export const ConnectionIndicator = ({
  isConnected,
}: ConnectionIndicatorProps) => {
  return (
    <div className="connection-indicator" data-testid="connection-indicator">
      {isConnected ? 'Connected' : 'Disconnected'}

      <FontAwesomeIcon
        icon={faCircle}
        className={isConnected ? 'connected' : 'disconnected'}
        aria-hidden="true"
      />
    </div>
  );
};
