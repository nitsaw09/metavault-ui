import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import NftImportModal from './NftImportModal';

const NFT_DATA = [
  {
    id: 1,
    name: 'NFT Token 1',
    address: '0x00',
    chainId: '1',
    image: 'https://via.placeholder.com/150',
    contract: '0x00'
  },
  {
    id: 2,
    name: 'NFT Token 2',
    address: '0x00',
    chainId: '1',
    image: 'https://via.placeholder.com/150',
    price: '0.5678',
    contract: '0x00'
  },
];

const NftTabContent: React.FC = () => {
  const [showImportModal, setShowImportModal] = React.useState(false);

  const handleImport = (address: string, tokenId: string) => {
    // Add your import logic here
    console.log('Importing NFT:', address, tokenId);
  };

  return (
    <>
    <Row>
      <Button variant="link" style={{fontSize: 'smaller'}} className='text-decoration-none' onClick={() => setShowImportModal(true)}>
        <i className="fas fa-plus" style={{marginRight:'5px'}}></i>
        NFT Import
      </Button>
    </Row>
    <Row className="p-2">
        {NFT_DATA.map((token) => (
            <Col md={2} key={token.id} className="mb-3" style={{padding: '10px !important'}}>
                <Card style={{padding: '10px'}}>
                    <Card.Img variant="top" src={token.image} />
                    <Card.Body>
                        <Card.Title>{token.name}</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </Row>
    {/* NFT Import Modal */}
    <NftImportModal show={showImportModal} onHide={() => setShowImportModal(false)} onImport={handleImport} />
    </>
  );
};

export default NftTabContent;