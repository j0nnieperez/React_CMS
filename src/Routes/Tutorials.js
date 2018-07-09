import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import Header from '../Components/Common/Header'

class Tutorials extends Component {
  render() {
    return (
      <div>
        <Header location={this.props.location} />
        <h1>Tutoriales</h1>
      </div>
    );
  }
}

export default Tutorials;
