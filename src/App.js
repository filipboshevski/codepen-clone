import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Login from './components/LoginSignUp/Login';
import SignUp from './components/LoginSignUp/SignUp';
import Navigation from './components/Navigation/Navigation';
import './components/sourceDoc/SourceDoc';
import SourceDoc from './components/sourceDoc/SourceDoc';
import { selectCurrentUser } from './redux/user/userSelectors';

function App({ currentUser }) {
  const [isLoginPressed, setLoginPressed] = useState(false);
  const [isSignUpPressed, setSignUpPressed] = useState(false);

  return (
    <div className="App">
      <Navigation isSignUpPressed={isSignUpPressed} setSignUpPressed={setSignUpPressed} isLoginPressed={isLoginPressed} setLoginPressed={setLoginPressed} />
      <SourceDoc />
      {
        isLoginPressed ? (<Login isLoginPressed={isLoginPressed} setLoginPressed={setLoginPressed} />) : null
      }
      {
        isSignUpPressed ? (<SignUp isSignUpPressed={isSignUpPressed} setSignUpPressed={setSignUpPressed} />) : null
      }
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(App);
