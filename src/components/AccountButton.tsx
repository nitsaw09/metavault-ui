import React from 'react';
import { Button } from 'react-bootstrap';
import { shortStrFormat } from '../utils/helper';

interface AccountButtonProps {
  onClick: () => void;
  accountSelected: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ onClick, accountSelected }) => {
  return (
    <Button className="mr-2 btn-top-bar" onClick={onClick}>
      <p>
      { shortStrFormat(accountSelected, 9) }
      </p>
    </Button>
  );
};

export default AccountButton;