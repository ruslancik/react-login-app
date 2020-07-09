import React from 'react';
import './App.css';
import {Route, Switch, Redirect } from 'react-router-dom'
import HomePage from './pages/home/home-page.component'
import Header from './component/header/header.component'
import ChangePassword from '../src/component/change-password/change-password.component'
import { auth } from './firebase/firebase.utils'
import {createUserProfileDocument} from './firebase/firebase.utils'
import SignUp from './component/signUp/signUp.component'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'
import SignIn from './component/signIn/sigIn.component';
import PasswordReset from './component/reset-password/reset.component'


 

class App extends React.Component {

  // its save us from javascript memory leaks. Its unsubscribe Auth
  unSubscribeFromAuth = null;

  componentDidMount(){

    // this is the setCurrentUser action
    const {setCurrentUser} = this.props;

   this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

    if(userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
            
          });
      })

    } else {
      setCurrentUser(userAuth)
    }
        
     
      }
   )
}


  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render(){

    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/change-password' component={ChangePassword} />
          <Route exact path='/reset-password' component={PasswordReset} />
          <Route exact path='/signin' 
            render={() => this.props.currentUser ? <Redirect to='/' /> : <SignIn />}
           />
          <Route exact path='/register' 
            render={() => this.props.currentUser ? <Redirect to='/' /> : <SignUp />}
           />
        </Switch>
      </div>
    );
  }
  
 }

 // we use Redirect beacause of we need redux state here(mapStateToProps). Otherwise we use 'null' as a 
 // first parametr in 'connect' HOC
 const mapStateToProps = ({user}) => ({
   currentUser : user.currentUser
 })

 const mapDispatchToProps = dispatch => ({
   setCurrentUser : user => dispatch(setCurrentUser(user))
 }) 

export default connect(mapStateToProps, mapDispatchToProps)(App);
