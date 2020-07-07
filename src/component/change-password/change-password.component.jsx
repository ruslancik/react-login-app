import React from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils'

import {SignUpContainer, SignUpTitle} from './change-password.style'

const userUid = auth.currentUser?.uid;
console.log(userUid);

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

    handleSubmit = event => {

    };

    render(){

        const userUid = auth.currentUser?.uid;
        console.log(userUid);

        return(

            <SignUpContainer>
                <SignUpTitle> Change Password</SignUpTitle>
                <span>You can change your password in this page</span>
                <form onSubmit={this.handleSubmit} className="sign-up-form">
                    <FormInput
                    name='password'
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
            </SignUpContainer>
        )
    }
}

export default ChangePassword;