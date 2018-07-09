import React, { Component } from 'react';
//import { Link } from 'react-router-dom'

class Contact extends Component {
  render() {
    return (
      <div style={styles.Footer} >
        <a href="./login" >Acceder</a>
      </div>
    );
  }
}

const styles = {
  Footer:{
    width:"100%",
    height:100,
    background:"#eee",
    padding:"3%",
  }
}

export default Contact;
