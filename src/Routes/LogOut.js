import React, {Component} from 'react'
import { Redirect } from "react-router-dom";

export default class Admin extends Component {
    componentWillMount(){
        localStorage.removeItem('token-auth');
    }

    render(){
        return <Redirect to='/' />;
    }
}
