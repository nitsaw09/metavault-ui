import { useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ImportWalletWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showError, setShowError] = useState('none');
  const [phraseInputs, setPhraseInputs] = useState(Array.from({ length: 12 }, (_, i) => i + 1)); 
  const [phrases, setPhrases] = useState(Array(12).fill(''));

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

  const handleConfirmClick = () => {
    const inputs = document.querySelectorAll('input[type="text"]');
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i] as HTMLInputElement;
      if (!input.value) {
        setShowError('block');
        console.log('Invalid Phrase');
        return;
      }
    }
    setShowError('none');
    history.push("/wallet");
  }

  const onPastePhrase = (event: any) => {
    let pastedText;
    if (event.clipboardData && event.clipboardData.getData) {
        pastedText = (event.clipboardData.getData('text/plain')).split(' ');
        console.log(pastedText);
        if (pastedText.length !== 12) {
            setShowError('block');
        } else {
          setShowError('none');
          const secretPhrase: string[] = [];
          for (let i = 0; i < pastedText.length; i++) {
              secretPhrase.push(pastedText[i]);
          }
          setPhrases(secretPhrase);
        }
    }
  }

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
            <Card.Title className="text-center">Confirm secret recovery phrase</Card.Title>
            {phraseInputs && (
              <Container className="text-center mt-3">
                <span style={{color: 'red', display: showError }}>Invalid Phrases, please try again!</span>
                <Row xs={2} className="mb-3 text-smaller">
                  {phraseInputs.map((input, index) => {
                    let inputWidth = '44%';
                    if ((index + 1).toString().length > 1) {
                        inputWidth = '40%';
                    }
                    return (
                        <>
                          {index + 1}. <input type="text" onPaste={onPastePhrase} value={phrases[index]} style={{border: 'none', borderBottom: '1px solid black', width: inputWidth, marginBottom: '10px', marginRight: '3px'}}/>
                        </>
                      )
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

export default ImportWalletWizard;