import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { shortStrFormat } from '../utils/helper';

const TransactionData = [
  {
    id: 1,
    type: 'Send',
    token: 'ETH',
    amount: '1.2345',
    status: 'completed',
    timestamp: '2022-01-01 12:00:00',
  },
  {
    id: 2,
    type: 'Receive',
    token: 'DAI',
    amount: '678.90',
    status: 'pending',
    timestamp: '2022-01-02 13:30:00',
  },
  {
    id: 3,
    type: 'Send',
    token: 'MATIC',
    amount: '0.00128798797987',
    status: 'failed',
    timestamp: '2022-01-03 10:15:00',
  },
];

/**
 * Renders a span element with a specific class based on the status provided.
 *
 * @param {string} status - The status to determine the class for the span element.
 * @return {JSX.Element} The span element with the appropriate class based on the status.
 */
const StatusText = ({ status }: { status: string }) => {
    switch (status) {
      case 'completed':
        return <span className="text-success mr-2">{status}</span>;
      case 'pending':
        return <span className="text-warning mr-2">{status}</span>;
      case 'failed':
        return <span className="text-danger mr-2">{status}</span>;
      default:
        return <span className="text-warning mr-2">{status}</span>;
    }
};

/**
 * Generates the content for the Activity Tab.
 *
 * @return {ReactElement} The JSX content for the Activity Tab.
 */
const ActivityTabContent: React.FC = (): React.ReactElement => {
  return (
    <>
    <Row className="p-2 activityTabContent">
      <Col>
        <ListGroup variant="flush">
          {TransactionData.map((transaction) => (
            <ListGroup.Item key={transaction.id}>
              <Row className="align-items-center">
                <Col>
                  <Row className="mb-1">
                    <Col>
                      <span className={`font-weight-bold ${transaction.status}-text`}>
                        {transaction.type}
                      </span>{' '}
                      <span className="text-muted">{transaction.token}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className="text-muted" style={{fontSize: 'xx-small'}}>{transaction.timestamp}</span>
                    </Col>
                  </Row>
                </Col>
                <Col className="text-center">
                  <span className="font-weight-bold">
                    { shortStrFormat(transaction.amount, 7) }
                  </span>{' '}
                  <small className="text-muted">{transaction.token}</small>
                </Col>
                <Col xs="auto">
                    <StatusText status={transaction.status}/>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
    </>
  );
};

export default ActivityTabContent;