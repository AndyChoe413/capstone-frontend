// import Single from "./components/pages/single/Single";
import TopBar from "../src/components/topbar/TopBar"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
// import Settings from "./components/pages/settings/Settings";
import Write from "./pages/write/Write"
import Single from "./pages/single/Single"
// import Write from "../src/components/pages/write/Write";
import React, { Component } from 'react'
import jwtDecode from "jwt-decode";

//The <Switch /> component will only render the first route that matches/includes the path. Once it finds the first route that matches the path, it will not look for any other matches. Not only that, it allows for nested routes to work properly, which is something that <Router /> will not be able to handle.
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";


export class App extends Component {

  state = {
    user: null,
  }

  login = (token) => {
    this.setState({
      user: {
        username: token.username,
        email: token.email
      }
    })
  }

  componentDidMount() {
    let getJwtToken = window.localStorage.getItem("jwtToken")

    if (getJwtToken) {
      const currentTime = Date.now() / 1000;
      let decodedJwtToken = jwtDecode(getJwtToken)

      if (decodedJwtToken.exp < currentTime) {
        this.handleUserLogout()
      } else {
        this.handleUserLogin(decodedJwtToken)
      }
    }
  }

  handleUserLogin = (user) => {
    this.setState({
      user: {
        email: user.email
      }
    })
  }

  handleUserLogout = () => {
    window.localStorage.removeItem("jwtToken")
    this.setState({
      user:null
    })
  }

  render() {

    const {user} = this.state
    
    return (
        
// Router and Route from react router dom creates a history

        <Router>
          {/*handleUserLogout={this.handleUserLogout } function is being passed into TopBar component  */}
          <TopBar user={user} handleUserLogout={this.handleUserLogout }/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/register" >
              {user ? <Home /> : <Register login={ this.login}/>}
        </Route>
          <Route exact path="/login"
            //render will send all the router props and methods like history
            render={(routerProps) => (
              <Login
              login={this.login}
                {...routerProps}
              />
            )}
          />
        <Route
          exact
            path="/write"
             //render will send all the router props and methods like history
          render={( routerProps ) => (
            <Write
              {...routerProps}
            />
          )}
        />   
        <Route exact path="/settings">
           {user ? <settings/> : <Register/>}
        </Route>
         {/* <Route exact path="/post/:postId">
          <Single/>
        </Route> */}
          <Route exact path="/post/:postId"
             //render will send all the router props and methods like history to Single 
              render={(routerProps) => (
              <Single {...routerProps}/>
              )}
            />
      </Switch>
    </Router>
  );
  }
}

export default App



