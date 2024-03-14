import React, { useEffect, useState } from 'react';
import AccountButton from '../components/AccountButton';
import NetworkButton from '../components/NetworkButton';
import AccountModal from '../components/AccountModal';
import NetworkModal from '../components/NetworkModal';
import TabBar from '../components/TabBar';
import { Col, Container, Row, Tab } from 'react-bootstrap';
import TokenTabContent from '../components/TokenTabContent';
import NftTabContent from '../components/NftTabContent';
import ActivityTabContent from '../components/ActivityTabContent';

/**
 * The Wallet screen component.
 */
const Wallet: React.FC = (): React.ReactElement => {
  const [showAccountModal, setShowAccountModal] = useState<boolean>(false);
  const [showNetworkModal, setShowNetworkModal] = useState<boolean>(false);
  const [selectedAccount, setSetSelectedAccount] = useState<string>('');
  const [selectedNetwork, setSetSelectedNetwork] = useState<string>('');

  useEffect(() => {
    setSetSelectedAccount('Account 1');
    setSetSelectedNetwork('Ethereum Mainnet');
  }, [])

  /**
   * Handles the account button click.
   */
  const handleAccountClick = (): void => {
    setShowAccountModal(true);
  };

  /**
   * Handles the account select event.
   *
   * @param {string} account The selected account.
   */
  const handleAccountSelect = (account: string): void => {
    setSetSelectedAccount(account);
    setShowAccountModal(false);
  };

  /**
   * Handles the network select event.
   *
   * @param {string} network The selected network.
   */
  const handleNetworkSelect = (network: string): void => {
    setSetSelectedNetwork(network);
    setShowNetworkModal(false);
  };

  /**
   * Handles the network button click.
   */
  const handleNetworkClick = (): void => {
    setShowNetworkModal(true);
  };

  /**
   * Handles the close event for both modals.
   */
  const handleClose = (): void => {
    setShowAccountModal(false);
    setShowNetworkModal(false);
  };

  return (
    <div>
      <Container fluid className="p-0 mt-4">
        <Row className="align-items-center top-nav ml-0">
          <Col>
            <NetworkButton onClick={handleNetworkClick} networkSelected={selectedNetwork} />
          </Col>
          <Col className="text-end">
            <AccountButton onClick={handleAccountClick} accountSelected={selectedAccount} />
          </Col>
        </Row>
        <Row className="align-items-center mb-4">
          <Col className="text-center mt-4">
            <p className="mb-0 text-larger">0 Sepolia ETH</p>
            <p className="lead mb-0 text-small">$ 7.2345 USD</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <TabBar>
              <Tab eventKey="token" title="Tokens">
                <TokenTabContent/>  
              </Tab>
              <Tab eventKey="nft" title="NFT">
                <NftTabContent/>
              </Tab>
              <Tab eventKey="activity" title="Activity">
                <ActivityTabContent/>
              </Tab>
            </TabBar>
          </Col>
        </Row>
      </Container>
      <AccountModal show={showAccountModal} onHide={handleClose} onAccountSelect={handleAccountSelect} />
      <NetworkModal show={showNetworkModal} onHide={handleClose} onNetworkSelect={handleNetworkSelect} />
    </div>
  );
};

export default Wallet;