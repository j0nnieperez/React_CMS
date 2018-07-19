import React, {Component} from 'react'
import Header from '../Components/Common/AdminHeader'
import SideMenu from '../Components/Common/SideMenu'
import { Route } from 'react-router-dom'
import { AdminHome, AdminDatabase, TableData } from "../Components/Admin/"

export default class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {
            showSideMenu:false,
            grantAccess:false,
            pathname: ''
        }

        this.handleShowMenu = this.handleShowMenu.bind(this)
    }

    componentWillMount(){
        const TokenAuth = localStorage.getItem('token-auth');
        if(TokenAuth !== null){
            this.setState({grantAccess:true})
        }
    }

    handleShowMenu(){
        this.setState({showSideMenu: !this.state.showSideMenu})
    }

    render(){
        if(this.props.location.pathname !== this.state.pathname){
            this.setState({showSideMenu:false, pathname:this.props.location.pathname})
        }
        if(!this.state.grantAccess) return <div><h1>401 Access Denied</h1></div>
        return (
            <div>
                <Header SideMenuShowed={this.state.showSideMenu} showSideMenu={this.handleShowMenu} /> 
                <SideMenu show={this.state.showSideMenu} />
                <Route exact path={this.props.match.url} component={AdminHome}/>
                <Route exact path={`${this.props.match.url}/database`} component={AdminDatabase} />
                <Route exact path={`${this.props.match.url}/database/table`} component={TableData} />
            </div>
        )
    }
}
