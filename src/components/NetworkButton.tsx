import React from 'react';
import { Button } from 'react-bootstrap';
import { shortStrFormat } from '../utils/helper';

interface NetworkButtonProps {
  onClick: () => void;
  networkSelected: string;
}

/**
 * Renders a NetworkButton component with the specified networkSelected value.
 *
 * @param {function} onClick - The function to call when the button is clicked.
 * @param {string} networkSelected - The network value to display.
 * @return {ReactElement} The rendered NetworkButton component.
 */
const NetworkButton: React.FC<NetworkButtonProps> = ({ onClick, networkSelected }): React.ReactElement => {
  return (
    <Button className="btn-top-bar ml-2" onClick={onClick}>
      <p>
      { shortStrFormat(networkSelected, 9) }
      </p>
    </Button>
  );
};

export default NetworkButton;