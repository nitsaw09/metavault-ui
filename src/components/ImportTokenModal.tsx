// ImportTokenModal.tsx
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface ImportTokenModalProps {
  show: boolean;
  onHide: () => void;
  onImport: (address: string, symbol: string, decimal: string) => void;
}

const ImportTokenModal: React.FC<ImportTokenModalProps> = ({ show, onHide, onImport }) => {
  const [address, setAddress] = React.useState('');
  const [symbol, setSymbol] = React.useState('');
  const [decimal, setDecimal] = React.useState('');

  const handleImport = () => {
    onImport(address, symbol, decimal);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Import Token</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Symbol</Form.Label>
            <Form.Control type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Decimal</Form.Label>
            <Form.Control type="text" value={decimal} onChange={(e) => setDecimal(e.target.value)} />
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
  );
};

export default ImportTokenModal;