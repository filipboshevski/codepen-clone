import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYi0YP_OXDhfSvgftTQmj0RGRmnbQpRrs",
    authDomain: "codepen-clone-bfc2d.firebaseapp.com",
    databaseURL: "https://codepen-clone-bfc2d.firebaseio.com",
    projectId: "codepen-clone-bfc2d",
    storageBucket: "codepen-clone-bfc2d.appspot.com",
    messagingSenderId: "1018697273853",
    appId: "1:1018697273853:web:8a14a69e6775c23ff38994"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = async () => await auth.signInWithPopup(googleProvider);

export const createUserProfileDocument = async (userAuth, displayName, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if (!snapShot.exists) {
        const createdAt = new Date();
        const { email, uid } = userAuth;
        try {
            await userRef.set({
                createdAt,
                displayName,
                id: uid,
                srcDoc: {
                    html: '',
                    css: '',
                    js: ''
                },
                projectName: 'Untitled',
                email,
                ...additionalData
            });
        } catch(error) {
            console.log('Error while creating user', error);
        }
    }
    return userRef;
};

export const signUpWithGoogle = async (setCurrentUser, setFuncPressed, loadSrcDoc, isVarPressed) => {
    const userAuth = await signInWithGoogle();
    const { user } = userAuth;
        if (userAuth) {
            const userRef = await createUserProfileDocument(user, user.displayName);
            const snapShot = await userRef.get();
            const currentUser = await snapShot.data();
            setCurrentUser(currentUser);
            setFuncPressed(!isVarPressed);
            loadSrcDoc(currentUser.srcDoc);
        };
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            unsubscribe();
            resolve(authUser);
        }, reject);
    });
};