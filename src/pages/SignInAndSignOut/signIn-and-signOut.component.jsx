import React from 'react'
import './signIn-and-signOut.component.scss'
import SignIn from '../../component/signIn/sigIn.component'
import SignUp from '../../component/signUp/signUp.component'

const SignInAndSignOut = () => {
    return (
        <div>
            <div className="sign-in-and-sign-out">
                <SignIn />
                <SignUp/>
            </div>
        </div>
    )
}

export default SignInAndSignOut
