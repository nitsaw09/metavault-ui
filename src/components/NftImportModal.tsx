// NftImportModal.tsx
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface NftImportModalProps {
  show: boolean;
  onHide: () => void;
  onImport: (address: string, tokenId: string) => void;
}

const NftImportModal: React.FC<NftImportModalProps> = ({ show, onHide, onImport }) => {
  const [address, setAddress] = React.useState('');
  const [tokenId, setTokenId] = React.useState('');

  const handleImport = () => {
    onImport(address, tokenId);
    onHide();
  };

  return (
    <>
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Import NFT</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" value={address} placeholder='0x0...' onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Token ID</Form.Label>
            <Form.Control type="text" value={tokenId} placeholder='1' onChange={(e) => setTokenId(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleImport}>
          Import
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default NftImportModal;