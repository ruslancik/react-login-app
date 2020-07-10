import React from 'react'
import {auth} from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'
import firebase from 'firebase/app'
//style
import {
    HeaderContainer,
    OptionsContainer,
    OptionLink,
    UserGreeting
} from './header.style'


const Header = ({currentUser}) => {

    const history = useHistory();
    var user = firebase.auth().currentUser;
    var userName;

    if (user != null) {
        userName = user.displayName;
    }

    const deleteUser = async () => {
       await user.delete().then(function() {
            alert('user deleted')
          }).catch(function(error) {
            alert(error.message)
          });

          history.push('/');
    }
    return (
        <HeaderContainer>
            <OptionsContainer>
            <OptionLink to='/'>Home</OptionLink>

                {
                    currentUser ?
                    <>
                    <OptionLink as='div' onClick={() => auth.signOut()}>Sign Out</OptionLink>
                    <UserGreeting>{`Hi, ${user.displayName}`}</UserGreeting>
                    <OptionLink to='/change-password'>Change Password</OptionLink>
                    <OptionLink to='/edit'>Edit</OptionLink>
                    <OptionLink to='/' onClick={deleteUser}>Remove</OptionLink>


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