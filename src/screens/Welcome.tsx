import React from 'react';
import { Button, Card, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


const Welcome: React.FC = () => {
  const history = useHistory();

  const handleNavigateToWalletCreation = () => {
    history.push("/create-wallet");
  }

  const handleNavigateToWalletImport = () => {
    history.push("/import-wallet");
  }

  return (
    <>
    <Container className="wallet-form-wizard">
      <Row className="justify-content-center mt-5">
        <Card>
            <Card.Title className="text-center">Welcome!</Card.Title>
            <Card.Text className="text-center text-smaller">
                Thank you for choosing MetaVault for managing your crypto assets and tokens.
            </Card.Text>
            <Button variant="primary" onClick={handleNavigateToWalletCreation} className="mb-3" type="submit" style={{width: '100%'}}>
                Create New Wallet
            </Button>
            <Button variant="info" onClick={handleNavigateToWalletImport} type="submit" style={{width: '100%'}}>
                Import Existing Wallet
            </Button>
        </Card>
      </Row>
    </Container>
    </>
  );
};

export default Welcome;