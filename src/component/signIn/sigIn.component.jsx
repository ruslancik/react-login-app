import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {signInWithGoogle, signInWithFacebook, auth} from '../../firebase/firebase.utils'
import {Link} from 'react-router-dom'
//style
import {
    SignInContainer,
    ButtonsBarContainer,
    SignInTitle
} from './signIn.style'

class SignIn extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             password: ''
        }
    }
    
    handleSubmit =  async event => {
        event.preventDefault();
        const {email, password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email:'', password:''})
        } catch (error) {
            console.log('there is no such user', error.message);
            alert('There is no such email or password. Please try again.')
        }
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]:value})
    }

    render() {
        return (
            <SignInContainer>
                <SignInTitle>I already have account</SignInTitle>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        handleChange={this.handleChange}
                        label='Email'
                        type="email"
                        name='email'
                        value={this.state.email}
                        required/>
                    <FormInput
                         handleChange={this.handleChange}
                         label='Password'
                         type="password"
                         name='password'
                         value={this.state.password}
                         required/>
                         <Link style={{color: 'green', fontWeight: 'bold'}} to='/reset-password'>Forget password ?</Link>
                         <ButtonsBarContainer>
                            <CustomButton style={{marginTop : '20px'}} type='submit'>SIGN IN</CustomButton>
                            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
                            <CustomButton onClick={signInWithFacebook} isFacebookSignIn>SIGN IN WITH FACEBOOK</CustomButton>
                            <CustomButton  inverted>REGISTER</CustomButton>
                         </ButtonsBarContainer>
                </form>

            </SignInContainer>
        )
    }
    
}

export default SignIn