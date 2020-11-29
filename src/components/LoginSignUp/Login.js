import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth, createUserProfileDocument, signUpWithGoogle } from '../../firebase/firebase.config';
import { loadSrcDoc } from '../../redux/sourceDoc/SourceDocActions';
import { srcDoc } from '../../redux/sourceDoc/SourceDocSelectors';
import { setCurrentUser } from '../../redux/user/userActions';
import { selectCurrentUser } from '../../redux/user/userSelectors';
import { CustomButton } from '../CustomButton/CustomButton';
import { CustomInput, CustomLabel } from '../CustomInput/CustomInput';
import './Login.scss';

const Login = ({ srcDoc, setLoginPressed, isLoginPressed, setCurrentUser, loadSrcDoc }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const userAuth = await auth.signInWithEmailAndPassword(email, password);
            const { user } = userAuth;
            if (userAuth) {
                const userRef = await createUserProfileDocument(user);
                const snapShot = await userRef.get();
                const currentUser = await snapShot.data();
                setCurrentUser(currentUser);
                console.log(currentUser);
                setLoginPressed(!isLoginPressed);
                // loadSrcDoc(currentUser.srcDoc);
            };
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSignInWithGoogle = async () => {
        await signUpWithGoogle(setCurrentUser, setLoginPressed, loadSrcDoc, isLoginPressed);
    }

    return (
        <div className='login'>
            <button className='login__background' onClick={() => setLoginPressed(!isLoginPressed)} ></button>
            <div className='login__panel'>
                <h1 className='login__title'>Log in with your account</h1>
                <form className='login__form' onSubmit={handleSubmit}>
                    <CustomLabel className='login__label-email' htmlFor='email'>Email Address</CustomLabel>
                    <CustomInput type='email' className='login__input-email' name='email' placeholder='Email Address' value={email} onChange={event => setEmail(event.target.value)}></CustomInput>
                    <CustomLabel className='login__label-password' htmlFor='password'>Password</CustomLabel>
                    <CustomInput type='password' className='login__input-password' name='password' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} style={{marginBottom: "40px"}}></CustomInput>
                    <div className='login__btnsection'>
                        <CustomButton color='black' bgColor='#47cf73' hoverBgColor='#349756' activeBgColor='#297A44' type='submit'>Log in</CustomButton>
                        <div className='separate'></div>
                        <CustomButton type='button' color='white' bgColor='#1a73e8' hoverBgColor='#0F5ABA' activeBgColor='#104A95' onClick={handleSignInWithGoogle}>Log in with Google</CustomButton>
                    </div>
                </form>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    srcDoc
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: currentUser => dispatch(setCurrentUser(currentUser)),
    loadSrcDoc: srcDoc => dispatch(loadSrcDoc(srcDoc))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
