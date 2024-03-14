import React from 'react';
import { Button } from 'react-bootstrap';
import { shortStrFormat } from '../utils/helper';

interface AccountButtonProps {
  onClick: () => void;
  accountSelected: string;
}

/**
 * React functional component for rendering an account button.
 *
 * @param {function} onClick - The function to be called when the button is clicked
 * @param {string} accountSelected - The selected account to be displayed on the button
 * @return {React.ReactElement} The rendered account button component
 */
const AccountButton: React.FC<AccountButtonProps> = ({ onClick, accountSelected }): React.ReactElement => {
  return (
    <Button className="mr-2 btn-top-bar" onClick={onClick}>
      <p>
      { shortStrFormat(accountSelected, 9) }
      </p>
    </Button>
  );
};

export default AccountButton;