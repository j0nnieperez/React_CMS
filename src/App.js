import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import {Home, Tutorials, About, Contact, Admin, Login, LogOut} from './Routes'

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{width:'100%', height:'100%'}} className="App">
          
          <Route path='/'           component={Home} exact />
          <Route path='/about'      component={About} />
          <Route path='/admin'      component={Admin} />
          <Route path='/login'      component={Login} />
          <Route path='/logout'     component={LogOut} />
          <Route path='/tutoriales' component={Tutorials} />
          <Route path='/contact'    component={Contact} />

        </div>
      </Router>
    );
  }
}

export default App;
