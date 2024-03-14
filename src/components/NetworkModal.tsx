import React, { useEffect, useState } from 'react';
import { Modal, ListGroup } from 'react-bootstrap';

interface NetworkModalProps {
  show: boolean;
  onHide: () => void;
  onNetworkSelect: (network: string) => void;
}

/**
 * React component for displaying a modal to select a network.
 *
 * @param {NetworkModalProps} show - boolean to show or hide the modal
 * @param {Function} onHide - function to handle modal hide event
 * @param {Function} onNetworkSelect - function to handle network selection
 * @return {React.ReactElement} The rendered modal component
 */
const NetworkModal: React.FC<NetworkModalProps> = ({ show, onHide, onNetworkSelect }): React.ReactElement => {
  const [networks, setNetworks] = useState<string[]>([]);

  useEffect(() => {
    setNetworks(['Ethereum Mainnet', 'Testnet', 'Sepolia']);
  }, [])

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