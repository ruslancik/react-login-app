import React from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'

import {ChangePasswordContainer, ChangePasswordTitle} from './change-password.style'
import firebase from 'firebase/app'

class ChangePassword extends React.Component {

    constructor(){
        super();

        this.state = {
            currentPassword:"",
            password:"",
            confirmPassword: ""
        }
    }
    // HandleChange function
    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]:value})
    }

    reAuthentication = (currentPassword) => {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(credential);
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {currentPassword, password, confirmPassword} = this.state;
        this.reAuthentication(currentPassword).then(() => {
           
            if(password !== confirmPassword) {
                alert("Passwords don't match ")
                return;
            }
           
                const user = firebase.auth().currentUser;
                user.updatePassword(password).then(() => {
                    alert('Password was changed')
                }).catch((error) => {
                    alert(error.message)
                })           
                
                }).catch((error) => {
                    alert(error.message)
                })
       
            //clearing out the form after submit
            this.setState({
                displayName:"",
                email:"",
                password:"",
                confirmPassword: "",
                question: ''
            })

       
    }

    

    render(){

        const userUid = auth.currentUser;
        console.log(userUid);

        return(

            <ChangePasswordContainer>
                <ChangePasswordTitle> Change Password</ChangePasswordTitle>
                <span>You can change your password in this page</span>
                <form onSubmit={this.handleSubmit} className="sign-up-form">
                    <FormInput
                    name='currentPassword'
                    type='password'
                    label='Current Password'
                    value={this.state.currentPassword}
                    onChange={this.handleChange}
                    required/>

                 
                    <FormInput
                    name='password'
                    type='password'
                    label='New Password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    required/>

                    <FormInput
                    name='confirmPassword'
                    type='password'
                    label='Confirm New Password'
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    required/>

                    <CustomButton type='submit'>Save</CustomButton>

                </form>
            </ChangePasswordContainer>
        )
    }
}

export default ChangePassword;