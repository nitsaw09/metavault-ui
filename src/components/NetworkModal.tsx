import React from 'react';
import { Modal, ListGroup } from 'react-bootstrap';

interface NetworkModalProps {
  show: boolean;
  onHide: () => void;
  onNetworkSelect: (network: string) => void;
}

const NetworkModal: React.FC<NetworkModalProps> = ({ show, onHide, onNetworkSelect }) => {
  const networks = ['Ethereum Mainnet', 'Testnet', 'Sepolia'];

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Select Network</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Select a network to switch to.</p>
        <ListGroup>
          {networks.map((network, index) => (
            <ListGroup.Item action key={index} eventKey={network} onClick={() => onNetworkSelect(network)}>
              { network }
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default NetworkModal;