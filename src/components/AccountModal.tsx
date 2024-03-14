import React, { useEffect, useState } from 'react';
import { Modal, ListGroup } from 'react-bootstrap';

interface AccountModalProps {
  show: boolean;
  onHide: () => void;
  onAccountSelect: (account: string) => void;
}

/**
 * Renders an Account Modal component with a list of accounts for selection.
 *
 * @param {AccountModalProps} show - Flag to show or hide the modal
 * @param {Function} onHide - Function to handle modal close event
 * @param {Function} onAccountSelect - Function to handle account selection
 * @return {ReactElement} Account Modal component
 */
const AccountModal: React.FC<AccountModalProps> = ({ show, onHide, onAccountSelect }): React.ReactElement => {
  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    setAccounts(['Account 1', 'Account 2', 'Account 3']);
  }, [])

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Select Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Select an account to view its details.</p>
        <ListGroup>
          {accounts.map((account, index) => (
            <ListGroup.Item action key={index} eventKey={account} onClick={() => onAccountSelect(account)}>
              {account}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default AccountModal;