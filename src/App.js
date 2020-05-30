import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import{SET_AUTHENTICATED} from './redux/types';
import{ logoutUser, getUserData } from './redux/actions/userActions';

//Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
//Pages Home
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import axios from 'axios';
import user from './pages/user';
import chat from './pages/chat';
const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://us-central1-social-a-f3a70.cloudfunctions.net/api';
const token = localStorage.FBIdToken;

console.log(token);
if (token) {
  //there is a token decode the token
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    //console.log("the decodedtoken is less than the date");
    store.dispatch(logoutUser())
    window.location.href = '/login';
    
  } else {
    //console.log("the decodedtoken is greater than the date");
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login}  />
              <AuthRoute exact path="/signup" component={signup}  />
              <Route exact path="/users/:handle" component={user} />
              <Route exact path="/users/:handle/scream/:screamId" component={user} />
              <Route exact path ="/chat" component={chat} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
