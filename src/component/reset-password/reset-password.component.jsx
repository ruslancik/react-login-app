import React, {useState,useEffect} from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {auth} from '../../firebase/firebase.utils'
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useHistory, useParams } from "react-router-dom";
import firebase from 'firebase/app'


//style
import {
    ResetContainer,
    ButtonsBarContainer,
    ResetTitle
} from './reset-password.style'



export const ResetPassword = () => {

    const [email, setEmail] = useState('');
 
 

    const history = useHistory();
    const firestore = useFirestore();
    const archiveRef = firestore.collection("users");
    const query = archiveRef.where('email', '==', `${email}`);
    const archiveData = useFirestoreCollectionData(query, {idField : 'id'});
    const UID = archiveData.map(user => user.id);
  
   
    useEffect(() => {
        console.log("searchValue ", email);
     },[email]);

       
    const handleSubmit =  async event => {
        await archiveData.map(user => {
            if(user.email === email){
                history.push(`/reset-password/${UID.toString()}/security-question`)}
                if(!user.email === email) {
            alert('There is not such an email registered')}
            return user.id;
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
    const { id } = useParams();
    const [answer, setAnswer] = useState('');
    const history = useHistory();
    const firestore = useFirestore();
    const archiveRef = firestore.collection("users");
    const archiveData = useFirestoreCollectionData(archiveRef);
   

    
   
    useEffect(() => {
        console.log("searchValue ", answer);
     },[answer]);

       
    const handleSubmit =  async event => {
        archiveData.map(user => {
            if(user.question === answer){
            history.push(`/reset-password/${id}/security-question/reset`)}
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

export const Reset = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const fireStore = useFirestore();
    const { id } = useParams();
    const userRef = fireStore.collection("users").doc(id);

    console.log(id);
 
 


    const handleSubmit = async () => {
        
    
    }


        return(

            <ResetContainer>
                <ResetTitle> Reset Password</ResetTitle>
                <span>You can reset your password in this page</span>
                <form onSubmit={handleSubmit} className="sign-up-form">
                                    
                    <FormInput
                    name='password'
                    type='password'
                    label='Reset New Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>

                    <FormInput
                    name='confirmPassword'
                    type='password'
                    label='Confirm New Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required/>

                    <CustomButton type='submit'>Reset</CustomButton>

                </form>
            </ResetContainer>
        )

}
