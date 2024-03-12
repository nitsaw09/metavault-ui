import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import ImportTokenModal from './ImportTokenModal';

interface TokenTabContentProps {}

const TokenTabContent: React.FC<TokenTabContentProps> = () => {
  const [showImportModal, setShowImportModal] = React.useState(false);

  const handleImport = (address: string, symbol: string, decimal: string) => {
    // Add your import logic here
    console.log('Importing Token:', address, symbol, decimal);
  };

  return (
    <>
    <Row className="p-2">
      <Col>
        <Button variant="primary" className="btn-95">
        <i className="fas fa-arrow-up mr-2"></i>
          Send
        </Button>
      </Col>
      <Col>
        <Button variant="dark"  className="btn-95">
        <i className="fas fa-arrow-down mr-2"></i>
          Receive
        </Button>
      </Col>
    </Row>
    <Row>
      <Button variant="link" style={{fontSize: 'smaller'}} className='text-decoration-none' onClick={() => setShowImportModal(true)}>
        <i className="fas fa-plus" style={{marginRight:'5px'}}></i>
        Import Token
      </Button>
    </Row>
    {/* Import Token Modal */}
    <ImportTokenModal show={showImportModal} onHide={() => setShowImportModal(false)} onImport={handleImport} />
    </>
  );
};

export default TokenTabContent;