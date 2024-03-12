import { useState } from "react";
import { Badge, Button, Card, Container, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const WalletCreationWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [wallet, setWallet] = useState(null);
  const [revealPhraseBtnTxt, setRevealPhraseBtnTxt] = useState('show');
  const [opacityValue, setOpacityValue] = useState({ opacity: '0.05' });
  const [tooltipCopyText, setTooltipCopyText] = useState('Copy to Clipboard');
  const [showError, setShowError] = useState('none');

  const generatePhrases = () => {
    return Array.from({ length: 12 }, (_, index) => `Phrase ${index + 1}`);
  };

  const [phrases, setPhrases] = useState(generatePhrases());

  const history = useHistory();

  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    const password = event.target.formPassword.value;
    const confirmPassword = event.target.formPasswordConfirm.value;

    if (password !== confirmPassword) {
      alert("The passwords you entered do not match.");
      return;
    }

    // Create the new wallet using the password.
    //const newWallet = createWallet(password);
    //setWallet(newWallet);

    // Go to the next step.
    handleNextClick();
  };

  const handleNextClick = () => {
    setStep(step + 1);
  };

  // const handleBackClick = () => {
  //   setStep(step - 1);
  // };

  const handleRevealPhrase = () => {
    const reveal = revealPhraseBtnTxt === 'show' ? true : false;
    if (reveal) {
      setOpacityValue({ opacity: '1' });
      setRevealPhraseBtnTxt('hide');
    } else {
      setOpacityValue({ opacity: '0.05'});
      setRevealPhraseBtnTxt('show');
    }
  }

  const handleCopyClick = () => {
    const listString = phrases.join('\n');
    navigator.clipboard.writeText(listString)
      .then(() => {
        setTooltipCopyText('Copied Phrase!');
      })
      .catch((error) => {
        setTooltipCopyText('Unable to Copy');
      });
    // Copy logic here (use document.execCommand or Clipboard API)
    console.log("Copy phrases to clipboard");
  };

  const handleConfirmClick = () => {
    const inputs = document.querySelectorAll('input[type="text"]');
    const phraseIndx = [4, 5, 6];
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i] as HTMLInputElement;
      if (phrases[phraseIndx[i]] !== input.value) {
        setShowError('block');
        console.log('Invalid Phrase');
        return;
      }
    }
    setShowError('none');
    history.push("/wallet");
  }

  const renderCopyTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipCopyText}
    </Tooltip>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Card.Title className="text-center">Create Password</Card.Title>
            <Card.Text className="text-center text-smaller">
              This password will unlock your MetaVault wallet only on this device. MetaVault
              cannot recover this password.
            </Card.Text>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formPassword" className="pb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Enter new password" />
              </Form.Group>
              <Form.Group controlId="formPasswordConfirm" className="pb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm new password" />
              </Form.Group>
              <Button variant="primary" type="submit" style={{width: '100%'}}>
                Create New Wallet
              </Button>
            </Form>
          </>
        );
      case 2:
        return (
          <>
            <Card.Title className="text-center">Write down secret recovery phrase</Card.Title>
            <Card.Text className="text-center text-smaller">Write down this 12-words secret phrase in the place where only you can access it.</Card.Text>
            {phrases && (
              <Container className="text-center mt-3">
                <Row xs={2} className="mb-3">
                  {phrases.map((phrase, index) => (
                    <Badge key={index} className="mb-2" style={opacityValue}>
                      {index + 1}. {phrase}
                    </Badge>
                  ))}
                </Row>
                <Row xs={2} className="mb-3">
                <Button variant="link" className="text-smaller reveal-phrase-btn-txt" onClick={handleRevealPhrase}>
                    {`${revealPhraseBtnTxt} phrase`}
                </Button>
                <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderCopyTooltip}>
                  <Button variant="link" className="text-smaller" onClick={handleCopyClick}>
                      Copy Phrases
                  </Button>
                </OverlayTrigger>
                </Row>
                <Row>
                  <Button variant="primary" onClick={handleNextClick}>
                    Next
                  </Button>
                </Row>
              </Container>
            )}
          </>
        );
      case 3:
        return (
          <>
            <Card.Title className="text-center">Confirm secret recovery phrase</Card.Title>
            {phrases && (
              <Container className="text-center mt-3">
                <span style={{color: 'red', display: showError }}>Invalid Phrases, please try again!</span>
                <Row xs={2} className="mb-3 text-smaller">
                  {phrases.map((phrase, index) => {
                    const inputIndx = [5, 6, 7];
                    if (!inputIndx.includes(index + 1)) {
                      return (
                        <Badge key={index} className="mb-2">
                          {index + 1}. {phrase}
                        </Badge>
                      );
                    } else {
                      return (
                        <>
                          {index + 1}. <input type="text" style={{border: 'none', borderBottom: '1px solid black', width: '44%', marginBottom: '10px', marginRight: '3px'}}/>
                        </>
                      );
                    }
                  })}
                </Row>
                <Row>
                  <Button variant="primary" onClick={handleConfirmClick}>
                    Confirm
                  </Button>
                </Row>
              </Container>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container className="wallet-form-wizard">
      <Row className="justify-content-center mt-5">
        <Card>{renderStep()}</Card>
      </Row>
    </Container>
  );
};

export default WalletCreationWizard;