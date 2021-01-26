import React from 'react'
import './App.css';
import { GlobalPosts } from './contextApi/posts/PostContext'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { PostsScreen } from './components/posts/Posts'
import { ProfileScreen } from './components/profile/Profile'
import { Navbar } from './components/layout/Navbar'
import { GlobalUser } from './contextApi/users/UsersContext'
import { UsersScreen } from './components/Users/Users';
import { UserDetails } from './components/Users/UserDetails'
import { ActionForm } from './components/profile/ActionForm'
import { PostDetails } from './components/profile/PostDetails'

function App() {
  return (
    <GlobalUser>
    <GlobalPosts>
      <Router>
        <Navbar />
      <Route exact path="/" component={PostsScreen} />
        <Switch>
        <Route exact path="/Profile" component={ProfileScreen} />
        <Route exact path="/Profile/edit/:id" component={ActionForm} />
        <Route exact path="/Profile/create" component={ActionForm} />
        <Route exact path="/Profile/view/:id" component={PostDetails} />

        <Route exact path="/Users" component={UsersScreen} />
        <Route exact path="/Users/details/:id" component={UserDetails} />
        </Switch>
      </Router>
    </GlobalPosts>
    </GlobalUser>
  );
}

export default App;
