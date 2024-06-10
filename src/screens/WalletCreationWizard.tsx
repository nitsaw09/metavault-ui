import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Container, Form, OverlayTrigger, Row, Tooltip, TooltipProps } from "react-bootstrap";
import { useHistory } from "react-router-dom";

/**
 * Generate and return the react elements based on the current step.
 *
 * @return {(React.ReactElement)} The react elements to render.
 */
const WalletCreationWizard: React.FC = (): React.ReactElement => {
  const [step, setStep] = useState<number>(1);
  const [wallet, setWallet] = useState<string>('');
  const [revealPhraseBtnTxt, setRevealPhraseBtnTxt] = useState<string>('show');
  const [opacityValue, setOpacityValue] = useState<string>('0.05');
  const [tooltipCopyText, setTooltipCopyText] = useState<string>('Copy to Clipboard');
  const [showError, setShowError] = useState<string>('none');
  const [phrases, setPhrases] = useState<string[]>([]);

  const history = useHistory();

  useEffect(() => {
    setPhrases(generatePhrases());
  }, []);

  /**
   * Generates an array of 12 random strings,
   * each prefixed with 'Phrase ' and the index + 1
   *
   * @returns Array<string> - An array of 12 random strings
   */
  const generatePhrases = (): Array<string> => {
    return Array.from({ length: 12 }, (_el, index) => `Phrase ${index + 1}`);
  }

  /**
   * Handles the form submission event.
   * 
   * @param event The form submission event, which should have a target with a property `formPassword` 
   * and `formPasswordConfirm` containing the password inputs.
   * @returns void
   */
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const password = event.currentTarget.formPassword.value;
    const confirmPassword = event.currentTarget.formPasswordConfirm.value;

    if (password !== confirmPassword) {
      setShowError("The passwords you entered do not match.");
      return;
    }

    // Create the new wallet using the password.
    //const newWallet = createWallet(password);
    //setWallet(newWallet);

    // Go to the next step.
    handleNextClick();
  }

  /**
   * Increments the step by 1.
   *
   * @returns void
   */
  const handleNextClick = (): void => {
    setStep(step + 1);
  }
  // const handleBackClick = () => {
  //   setStep(step - 1);
  // };

  /**
   * Handles the reveal phrase button click, toggling the visibility of the phrase.
   * @param {React.MouseEvent<HTMLElement>} event The click event.
   * @returns {void} This function does not return anything.
   */
  const handleRevealPhrase = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    const reveal = revealPhraseBtnTxt === 'show' ? true : false;
    if (reveal) {
      setOpacityValue('1');
      setRevealPhraseBtnTxt('hide');
    } else {
      setOpacityValue('0.05');
      setRevealPhraseBtnTxt('show');
    }
  }


  /**
   * Copies the secret phrase to the clipboard.
   *
   * @param {MouseEvent} event The click event from the button.
   * @returns {Promise<void>} A promise that resolves when the copy is complete.
   */
  const handleCopyClick = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
    const listString = phrases.join('\n');
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(listString);
      setTooltipCopyText('Copied Phrase!');
    } catch (error) {
      setTooltipCopyText('Unable to Copy');
    }
  };

  /**
   * Handles the click event on the confirm button.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event The click event from the button.
   * @returns {void} This function does not return anything.
   */
  const handleConfirmClick = (): void => {
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="text"]');
    const phraseIndx = [4, 5, 6] as const;

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (phrases[phraseIndx[i]] !== input.value) {
        setShowError('block');
        console.log('Invalid Phrase');
        return;
      }
    }

    setShowError('none');
    history.push("/wallet");
  }
  
  /**
   * A description of the entire function.
   *
   * @param {TooltipProps} props - description of parameter
   * @return {React.ReactElement} description of return value
   */
  const renderCopyTooltip = (props: TooltipProps): React.ReactElement => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipCopyText}
    </Tooltip>
  );

  /**
   * Generate and return the JSX elements based on the current step.
   *
   * @return {(React.ReactElement | null)} The JSX elements to render or null.
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
            <Card.Title className="text-center">Write down secret recovery phrase</Card.Title>
            <Card.Text className="text-center text-smaller">Write down this 12-words secret phrase in the place where only you can access it.</Card.Text>
            {phrases && (
              <Container className="text-center mt-3">
                <Row xs={2} className="mb-3">
                  {phrases.map((phrase, index) => (
                    <Badge key={index} className="mb-2" style={{opacity: opacityValue}}>
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
        <Card style={{width: '320px'}}>{renderStep()}</Card>
      </Row>
    </Container>
  );
};

export default WalletCreationWizard;