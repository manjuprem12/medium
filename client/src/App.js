import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import Home from './components/layout/Home'
import UserRegister from './components/authentication/Register'
import UserLogin from './components/authentication/Login'
//import Topic from './components/Topics/Topic'
import axios from './config/axios'
import ListStory from './components/Stories/ListStory'
 import ShowStory from './components/Stories/ShowStory'
 import EditStory from './components/Stories/EditStory'
import NewStory from './components/Stories/NewStory'
//import ListResponse from './components/Responses/List'

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      isAuthenticated : !! localStorage.getItem('token') ,
    }
    this.handleIsAuthenticated = this.handleIsAuthenticated.bind(this)
  }
  handleIsAuthenticated(bool) {
    this.setState(() => ({
      isAuthenticated : bool
    }))
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <h2> Welcom to Medium </h2>
          <Link to = "/">Home</Link>|
         {/* <Link to = "/topics" >Topic</Link> */}
          <Link to = "/stories"> Story </Link>|
          {
            this.state.isAuthenticated && <Link to ="/users/logout" > Logout </Link>
          }
          {
            !this.state.isAuthenticated && (
              <div>
                <Link to = "/users/register" >Register</Link> |
                <Link to = "/users/login">Login</Link>
              </div>
            )
          }

       
        <Switch>
        <Route path="/" component={Home} exact={true} />
        {/* <Route path="/topics" component={Topic} exact={true} />  */}
        <Route path = "/stories" component = {ListStory} exact = {true} />
        <Route path = "/stories/new"  render = {() => <NewStory onChange = {this.onChange} />} exact = {true} /> 
         <Route path = "/stories/:id" component = {ShowStory} exact = {true} />
        <Route path = "/stories/edit/:id" component = {EditStory} exact = {true} /> 
 
        
        <Route path = "/users/register" component = {UserRegister} />
          <Route path = "/users/login"  render = {() => <UserLogin handleIsAuthenticated = {this.handleIsAuthenticated} /> } />
          <Route path="/users/logout" component={() => {
              localStorage.clear()
              axios.defaults.headers['x-auth'] = null 
              return (
                <div>
                  <p>You have successfully logged out</p>
                </div>
              )
            }}/>
        </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App