import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "./Resources/css/App.css"
import {AccessModel} from './Models'
import ClientJS from 'clientjs'

import {Home, Tutorials, About, Contact, Admin, Login, LogOut} from './Routes'

class App extends Component {
  render() {
    try {
      var client = new ClientJS();
      AccessModel.NewAccess(client.getResult())
    } catch (error) {
      console.log("")      
    }
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
