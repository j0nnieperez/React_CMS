import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import '../Resources/css/About.css'
import Header from '../Components/Common/Header'

class About extends Component {

  constructor(props){
    super(props)
    this.state = {
      sections:[]
    }

  }

  onClickSection(section){
    let sections = this.state.sections
    sections.map(FSection => {
      if(FSection.id === section.id){
        FSection.focus = !FSection.focus
      }else{
        FSection.focus = false
      }
      return FSection
    })
    this.setState({sections})
  }

  render() {
    return (
      <div style={styles.container} >
        <Header location={this.props.location} />
      </div>
    );
  }
}

const styles = {
  container: {
    width:'100%'
  }
}

export default About;
