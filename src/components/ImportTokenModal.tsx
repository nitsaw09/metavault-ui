// ImportTokenModal.tsx
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface ImportTokenModalProps {
  show: boolean;
  onHide: () => void;
  onImport: (address: string, symbol: string, decimal: string) => void;
}

/**
 * React functional component for importing a token.
 *
 * @param {ImportTokenModalProps} show - Boolean to indicate if the modal should be shown
 * @param {function} onHide - Function to hide the modal
 * @param {function} onImport - Function to handle the import action
 * @return {ReactElement} The ImportTokenModal component
 */
const ImportTokenModal: React.FC<ImportTokenModalProps> = ({ show, onHide, onImport }): React.ReactElement => {
  const [address, setAddress] = React.useState<string>('');
  const [symbol, setSymbol] = React.useState<string>('');
  const [decimal, setDecimal] = React.useState<string>('');

  /**
   * A description of the entire function.
   *
   * @param {type} paramName - description of parameter
   * @return {void} 
   */
  const handleImport = (): void => {
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