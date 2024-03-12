import React from 'react';
import { Modal, ListGroup } from 'react-bootstrap';

interface AccountModalProps {
  show: boolean;
  onHide: () => void;
  onAccountSelect: (account: string) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ show, onHide, onAccountSelect }) => {
  const accounts = ['Account 1', 'Account 2', 'Account 3'];

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