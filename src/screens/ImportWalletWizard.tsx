import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

/**
 * ImportWalletWizard component
 * @returns React.ReactElement
 */
const ImportWalletWizard: React.FC = () : React.ReactElement => {
  const [step, setStep] = useState<number>(1);
  const [showError, setShowError] = useState<string>('');
  const [phraseInputs, setPhraseInputs] = useState<number[]>([]); 
  const [phrases, setPhrases] = useState<string[]>([]);

  const history = useHistory();

  useEffect(() => {
    setStep(1);
    setShowError('none')
    setPhraseInputs(Array.from({ length: 12 }, (_, i) => i + 1));
    setPhrases(Array(12).fill(''));
  }, []);

  /**
   * A description of the entire function.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - the form event that triggered the submission
   * @return {void} this function does not return anything
   */
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const password = formData.get('formPassword') as string;
    const confirmPassword = formData.get('formPasswordConfirm') as string;

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

  /**
   * Increments the step by 1.
   */
  const handleNextClick = () => {
    setStep(step + 1);
  };

  // const handleBackClick = () => {
  //   setStep(step - 1);
  // };

  /**
   * Function to handle the click event for confirmation.
   *
   * @return {void} 
   */
  const handleConfirmClick = (): void => {
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

  /**
   * Handle pasting a phrase from the clipboard.
   *
   * @param {React.ClipboardEvent<HTMLInputElement>} event - The clipboard event
   * @return {void} No return value
   */
  const onPastePhrase = (event: React.ClipboardEvent<HTMLInputElement>): void => {
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
        }
    }
}

  /**
   * A function that renders different steps based on the value of 'step'.
   *
   * @return {React.ReactElement} The element representing the step to render.
   */
  const renderStep = (): (React.ReactElement | null) => {
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
        <Card style={{width: '320px'}}>{renderStep()}</Card>
      </Row>
    </Container>
  );
};

export default ImportWalletWizard;