import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth, createUserProfileDocument } from '../../firebase/firebase.config';
import { setCurrentUser } from '../../redux/user/userActions';
import { selectCurrentUser } from '../../redux/user/userSelectors';
import { CustomButton } from '../CustomButton/CustomButton';
import { CustomInput, CustomLabel } from '../CustomInput/CustomInput';
import './SignUp.scss';

const SignUp = ({ setSignUpPressed, isSignUpPressed, setCurrentUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const userAuth = await auth.createUserWithEmailAndPassword(email, password);
            const { user } = userAuth;
            if (userAuth) {
                const userRef = await createUserProfileDocument(user, displayName);
                const snapShot = await userRef.get();
                const currentUser = await snapShot.data();
                setCurrentUser(currentUser);
                setSignUpPressed(!isSignUpPressed);
            };
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='signup'>
            <button className='signup__background' onClick={() => setSignUpPressed(!isSignUpPressed)} ></button>
            <div className='signup__panel'>
                <h1 className='signup__title'>Sign up with your email and password</h1>
                <form className='signup__form' onSubmit={handleSubmit}>
                <CustomLabel className='signup__label-name' htmlFor='name'>Full Name</CustomLabel>
                    <CustomInput type='name' className='signup__input-name' name='name' placeholder='Full Name' value={displayName} onChange={event => setDisplayName(event.target.value)}></CustomInput>
                    <CustomLabel className='signup__label-email' htmlFor='email'>Email Address</CustomLabel>
                    <CustomInput type='email' className='signup__input-email' name='email' placeholder='Email Address' value={email} onChange={event => setEmail(event.target.value)}></CustomInput>
                    <CustomLabel className='signup__label-password' htmlFor='password'>Password</CustomLabel>
                    <CustomInput type='password' className='signup__input-password' name='password' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} style={{marginBottom: "40px"}}></CustomInput>
                    <div className='signup__btnsection'>
                        <CustomButton color='black' bgColor='#47cf73' hoverBgColor='#349756' activeBgColor='#297A44' type='submit'>Sign Up</CustomButton>
                    </div>
                </form>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: currentUser => dispatch(setCurrentUser(currentUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
