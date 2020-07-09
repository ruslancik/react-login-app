import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase/app'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {
    ResetContainer,
    ButtonsBarContainer,
    ResetTitle
} from './reset-password.style'



const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = event => {
    event.preventDefault();
    firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => {
          setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };
  return (
    <ResetContainer>
      <ResetTitle>
        Reset your Password
      </ResetTitle>
        <form action="">
          {emailHasBeenSent && (
            <div>
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div >
              {error}
            </div>
          )}
            <FormInput
            onChange={onChangeHandler}
            label='Email'
            type="email"
            name='userEmail'
            value={email}
            required/>
         
            <ButtonsBarContainer>
                <CustomButton onClick={event => {sendResetEmail(event)}} type='submit'>Submit</CustomButton>
            </ButtonsBarContainer>
        </form>

        <Link to="/"> &larr; back to sign in page</Link>
    </ResetContainer>
  );
};

export default PasswordReset;