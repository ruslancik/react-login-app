import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

export const config = {
    apiKey: "AIzaSyC8tdsmvC_btjTIh4j9ZKR4XpCZLc5C5BQ",
    authDomain: "react-login-app-c9e9d.firebaseapp.com",
    databaseURL: "https://react-login-app-c9e9d.firebaseio.com",
    projectId: "react-login-app-c9e9d",
    storageBucket: "react-login-app-c9e9d.appspot.com",
    messagingSenderId: "182985525786",
    appId: "1:182985525786:web:d02d54e0cb930ed3d3dfa3",
    measurementId: "G-LSJTL8XTP7"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    // if there is no signIn return nothing
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error during creating user', error.message)
        }
    }

    return userRef;
}



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({'prompt': 'select_account'});

const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({'display': 'popup'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider)

export default firebase;
 