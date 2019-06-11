import React, { Fragment, Component } from 'react';
import Navbar from "./components/layout/Navbar.js"
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Users from "./components/users/Users.js"
import Search from "./components/users/Search.js"
import axios from 'axios';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from "./components/users/User.js";
import Spinner from './components/layout/Spinner';



class App extends Component {
  state = {
    users: [],
    singleUser: {},
    repos: [],
    loading: false,
    alert: null

  }

  componentDidMount() {
    this.setState({ loading: true })
    if (this.state.loading) {
      return <Spinner />
    } else {
      this.searchUsers('twistedx');
    }
  }
  //search for users with this name 
  searchUsers = async text => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data.items)
    this.setState({ users: res.data.items, loading: false }
    )
  }

  //get user github profile
  getUser = async (username) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ singleUser: res.data, loading: false });
  }

  //get user repos
  //get user github profile
  getUserRepos = async (username) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ repos: res.data, loading: false });
  }



  //clears list of users found
  clearUsers = () => this.setState({ users: [], loading: false });

  // alerts is no username is entered into search
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  }

  render() {
    const { users, singleUser, repos, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  singleUser={singleUser}
                  loading={loading}
                  repos={repos}
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
