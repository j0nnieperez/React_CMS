import React, { Component } from 'react';
import './Themes'
import * as Icon from 'react-icons/lib/io'
import AppConfig from './AppConfig'

class Header extends Component {
  render() {
    return (
      <div className='Header' >
            <Icon.IoAndroidMenu className='MenuIcon' /> 
            <h1 className="AppName" >{AppConfig.name} Admin Panel</h1>

            <div>

            </div>
      </div>
    );
  }
}

export default Header;
