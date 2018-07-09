import React, { Component } from 'react'
//import { Link } from 'react-router-dom'

import Slider from '../Components/Common/Slider'
import HomePosts from '../Components/App/HomePosts'
import Header from '../Components/Common/Header'
import Footer from '../Components/Common/Footer'

class Home extends Component {
  render() {
    return (
        <div>
            <Header location={this.props.location} />
            <Slider />
            <HomePosts />
            <Footer />
        </div>
    );
  }
}

export default Home;
