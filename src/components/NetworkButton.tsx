import React from 'react';
import { Button } from 'react-bootstrap';
import { shortStrFormat } from '../utils/helper';

interface NetworkButtonProps {
  onClick: () => void;
  networkSelected: string;
}

const NetworkButton: React.FC<NetworkButtonProps> = ({ onClick, networkSelected }) => {
  return (
    <Button className="btn-top-bar ml-2" onClick={onClick}>
      <p>
      { shortStrFormat(networkSelected, 9) }
      </p>
    </Button>
  );
};

export default NetworkButton;