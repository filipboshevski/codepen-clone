import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Login from './components/LoginSignUp/Login';
import SignUp from './components/LoginSignUp/SignUp';
import Navigation from './components/Navigation/Navigation';
import './components/sourceDoc/SourceDoc';
import SourceDoc from './components/sourceDoc/SourceDoc';
import { selectIsLoading } from './redux/loader/LoaderSelectors';
import { onIsUserPersistedStart } from './redux/user/userActions';
import { selectCurrentUser } from './redux/user/userSelectors';
import Spinner from './components/alone-spinner/Spinner';

function App({ isUserPersisted, isLoading }) {
  const [isLoginPressed, setLoginPressed] = useState(false);
  const [isSignUpPressed, setSignUpPressed] = useState(false);

  useEffect(() => {
    isUserPersisted();
  }, [isUserPersisted]);

  return (
    isLoading ? <Spinner /> : (<div className="App">
      <Navigation isSignUpPressed={isSignUpPressed} setSignUpPressed={setSignUpPressed} isLoginPressed={isLoginPressed} setLoginPressed={setLoginPressed} />
      <SourceDoc />
      {
        isLoginPressed ? (<Login isLoginPressed={isLoginPressed} setLoginPressed={setLoginPressed} />) : null
      }
      {
        isSignUpPressed ? (<SignUp isSignUpPressed={isSignUpPressed} setSignUpPressed={setSignUpPressed} />) : null
      }
    </div>)
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectIsLoading
})

const mapDispatchToProps = dispatch => ({
  isUserPersisted: () => dispatch(onIsUserPersistedStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
