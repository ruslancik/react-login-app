import React from 'react'
import {auth} from '../../firebase/firebase.utils'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'
import { Menu, Dropdown } from "antd";
import { UserOutlined } from '@ant-design/icons';
//style
import {
    HeaderContainer,
    OptionsContainer,
    OptionLink,
    UserGreeting
} from './header.style'




const Header = () => {

    const history = useHistory();
    var user = auth.currentUser;
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

    const greeting = (name) => {
        return `Hi, ${name}`
    }

    const menu = (
        <Menu style={{margin:'0 10px'}}>
            <Menu.Item>
                <OptionLink to='/change-password'>Change Password</OptionLink>
            </Menu.Item>
            <Menu.Item>
                <OptionLink to='/edit'>Edit</OptionLink>
            </Menu.Item>
            <Menu.Item onClick={deleteUser}>Remove</Menu.Item>
            <Menu.Item onClick={() => auth.signOut()}> Sign Out</Menu.Item>
        </Menu>
    )

    return (
        <HeaderContainer>
            <OptionsContainer>
            <OptionLink to='/'>Home</OptionLink>

                {
                    user ?
                    <>
                        <UserGreeting>{greeting(userName)}</UserGreeting>
                        <Dropdown overlay={menu} trigger={["click"]}>
                        <UserOutlined style={{margin: '0 10px'}} />
                        </Dropdown>
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
// const mapStateToProps = ({user: {currentUser}}) => ({
//     currentUser    
// })

export default Header;