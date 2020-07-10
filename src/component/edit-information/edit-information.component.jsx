import React, {useState} from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { useHistory } from 'react-router-dom'
import {SignUpContainer, SignUpTitle} from './edit-information.style'
import firebase from 'firebase/app'

const EditInformation = () => {
    const history = useHistory();
    var user = firebase.auth().currentUser;
    var userName;
 
    
    if (user !== null) {
        userName = user.displayName;
    }

    const [name, setName] = useState(userName)
    console.log(name);

   
    //HandleSubmit function
    const handleSubmit = async event => {
        event.preventDefault();

       
        try {
            user.updateProfile({
                displayName: name,
                photoURL: ""
              }).then(function() {
                alert('Edit saved')
              }).catch(function(error) {
                alert(error.message)
              });   
              history.push('/') 
              window.location.reload();

        } catch (error) {
            console.log(error.message)
        }
    }


        return(

            <SignUpContainer>
                <SignUpTitle> Edit Details </SignUpTitle>
                <span>You can edit your personal information in this page</span>
                <form onSubmit={handleSubmit} className="sign-up-form">
                    <FormInput
                    name='displayName'
                    type='text'
                    label='Display Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required/>

                
                    <CustomButton type='submit'>Edit</CustomButton>

                </form>
            </SignUpContainer>
        )
    }

export default EditInformation;