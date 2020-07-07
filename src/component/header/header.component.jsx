import React from 'react'
import {auth} from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
//style
import {
    HeaderContainer,
    OptionsContainer,
    OptionLink,
    UserGreeting
} from './header.style'


const Header = ({currentUser}) => {
    return (
        <HeaderContainer>
            <OptionsContainer>
            <OptionLink to='/'>Home</OptionLink>

                {
                    currentUser ?
                    <>
                    <OptionLink as='div' onClick={() => auth.signOut()}>Sign Out</OptionLink>
                    <UserGreeting>{`Hi, ${currentUser.displayName}`}</UserGreeting>
                    <OptionLink to='/change-password'>Change Password</OptionLink>

                    </>
                    :
                    <OptionLink to='/signin'>Sign In</OptionLink>

                }
            </OptionsContainer>
           
         </HeaderContainer>
    )
}

// destructing currentUser and hidden 
// currentUser : state.user.currentUser
const mapStateToProps = ({user: {currentUser}}) => ({
    currentUser    
})

export default connect(mapStateToProps)(Header);