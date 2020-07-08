import React, {useState,useEffect} from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {signInWithGoogle, signInWithFacebook, auth} from '../../firebase/firebase.utils'
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useHistory } from "react-router-dom";
import * as admin from "firebase-admin";

//style
import {
    ResetContainer,
    ButtonsBarContainer,
    ResetTitle
} from './reset-password.style'



export const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const adminEmail = admin.auth().getUserByEmail(email);
    console.log(adminEmail)
 

    const history = useHistory();
    const firestore = useFirestore();
    const archiveRef = firestore.collection("users");
    const archiveData = useFirestoreCollectionData(archiveRef);
    console.log(archiveData);    
   

    
   
    useEffect(() => {
        console.log("searchValue ", email);
     },[email]);

       
    const handleSubmit =  async event => {
        archiveData.map(user => {
            if(user.email === email){
            history.push('/reset-password/security-question')}
            if(!user.email === email) {
            alert('There is not such an email registered')}
        })
    }

    
        return (
            <ResetContainer>
                <ResetTitle>Resetting your password</ResetTitle>
                <span>Enter your email</span>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        handleChange={(e) => setEmail(e.target.value)}
                        label='Email'
                        type="email"
                        name='email'
                        value={email}
                        required/>

                         <ButtonsBarContainer>
                            <CustomButton type='submit'>Submit</CustomButton>
                         </ButtonsBarContainer>
                </form>

            </ResetContainer>
        )
        
}



export const SecurityQuestion = () => {
    const [answer, setAnswer] = useState('');
    const history = useHistory();
    const firestore = useFirestore();
    const archiveRef = firestore.collection("users");
    const archiveData = useFirestoreCollectionData(archiveRef);
    console.log(archiveData);    
   

    
   
    useEffect(() => {
        console.log("searchValue ", answer);
     },[answer]);

       
    const handleSubmit =  async event => {
        archiveData.map(user => {
            if(user.question === answer){
            history.push('/reset-password/security-question/reset')}
            if(!user.question === answer) {
            alert('There is not such an answer');
        }
        })
    }

    
        return (
            <ResetContainer>
                <ResetTitle>Answer Security Question</ResetTitle>
                <span>What is your first pet name ?</span>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        handleChange={(e) => setAnswer(e.target.value)}
                        label='Answer'
                        type="text"
                        name='answer'
                        value={answer}
                        required/>

                         <ButtonsBarContainer>
                            <CustomButton type='submit'>Submit</CustomButton>
                         </ButtonsBarContainer>
                </form>

            </ResetContainer>
        )
        
}