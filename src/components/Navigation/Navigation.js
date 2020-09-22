import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { auth } from '../../firebase/firebase.config';
import { saveSrcDocStart, updateCss, updateHtml, updateJs } from '../../redux/sourceDoc/SourceDocActions';
import { srcDoc } from '../../redux/sourceDoc/SourceDocSelectors';
import { setCurrentUser, updateProjectName } from '../../redux/user/userActions';
import { selectCurrentUser, selectProjectName } from '../../redux/user/userSelectors';
import { CustomButton } from '../CustomButton/CustomButton';
import './Navigation.scss';

const Navigation = (props) => {
    const { updateProjectName, projectName, srcDoc, 
           saveSrcDocStart, isLoginPressed, setLoginPressed, 
           currentUser, setCurrentUser, isSignUpPressed, 
           setSignUpPressed, updateHtml, updateCss,
           updateJs } = props;
           
    const signOut = async () => {
        await auth.signOut();
        setCurrentUser(null);
        updateHtml('');
        updateCss('');
        updateJs('');
    };

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isSaving) {
            setTimeout(() => {
                setIsSaving(false);
            }, 2000);
        };
    }, [isSaving]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        updateProjectName(editedName);
        setIsEditing(false);
    };

    const handleNameChange = () => {
        if (currentUser) {
            setIsEditing(!isEditing);
            return;
        };
        setSignUpPressed(!isSignUpPressed);
    };

    return (
        <div className='nav'>
            <div className='nav__logo-container'>
                <svg className='nav__logo' width="30" height="40">
                    <use xlinkHref='./codepen.svg#Bold' width='30' height='30'></use>
                </svg>
            </div>
            <div className='project'>
                {
                    isEditing && currentUser ? (
                        <form onSubmit={handleSubmit}><input placeholder='Type here - Enter to save' type='name' className='project__change-name' value={editedName} onChange={e => setEditedName(e.target.value)} /></form>
                    ) : (<h3 className='project__name'>
                        {
                            currentUser ? projectName : 'Untitled'
                        }
                        <svg onClick={handleNameChange} id="edit" height='15' width='15' viewBox="0 0 100 100"><path d="M24.56 92.536L0 100l7.453-24.583c6.356-.244 17.322 10.792 17.107 17.119zM96.617 32.082l-.475.471L67.383 3.766l.472-.472c12.927-12.94 42.016 15.517 28.762 28.788zM61.64 9.516l28.758 28.785-46.303 46.345c-1.222 1.221-2.234.884-2.234.884l2.314-15.356-14.454.074.072-14.468-15.342 2.312s-.34-1.011.883-2.234L61.64 9.516z"></path></svg>
                    </h3>)
                }
                {
                    currentUser ? <span className='project__username'>{currentUser.displayName}</span> : <span className='project__username'>Captain Anonymous</span>
                }
            </div>
            <div className='options' style={{marginTop: '5px'}}>
                {
                    !currentUser && window.screen.width > 500 ? <div className='options__reminder'>You must log in to use the Save feature.</div> : null 
                }
                {
                    currentUser ? (isSaving ? <div className='options__greeting'>Saving...</div> : <div className='options__greeting'>Hello, {currentUser.displayName}</div>) : null
                }
                <CustomButton type='button' color='white' hoverBgColor='#585D6F' activeBgColor='#63656E' bgColor='#444857' onClick={() => {
                        if (currentUser) {
                            saveSrcDocStart(srcDoc, currentUser);
                            setIsSaving(true);
                            return true;
                        }
                        setLoginPressed(!isLoginPressed);
                    }} >
                    <svg style={{marginRight: '5px'}} width='20' height='20'>
                        <use xlinkHref='./cloud.svg#cloud' width='20' height='20'></use>
                    </svg>
                    Save
                </CustomButton>
                {
                    currentUser ? (
                        <CustomButton type='button' color='white' hoverBgColor='#585D6F' activeBgColor='#63656E' bgColor='#444857' onClick={signOut}>Sign Out</CustomButton>
                    ) : (<div className='signupin'>
                    <CustomButton isUser={!!currentUser} type='button' color='black' hoverBgColor='#3EAE64' activeBgColor='#358751' bgColor='#47cf73' bold onClick={() => setSignUpPressed(!isSignUpPressed)}>Sign Up</CustomButton>
                    <CustomButton type='button' color='white' hoverBgColor='#585D6F' activeBgColor='#63656E' bgColor='#444857' onClick={() => setLoginPressed(!isLoginPressed)}>Sign In</CustomButton>
                    </div>
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    srcDoc,
    projectName: selectProjectName
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: currentUser => dispatch(setCurrentUser(currentUser)),
    saveSrcDocStart: (srcDoc, currentUser) => dispatch(saveSrcDocStart(srcDoc, currentUser)),
    updateProjectName: projectName => dispatch(updateProjectName(projectName)),
    updateHtml: html => dispatch(updateHtml(html)),
    updateCss: css => dispatch(updateCss(css)),
    updateJs: js => dispatch(updateJs(js))
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
