import React, {Component} from 'react'
import Header from '../Components/Common/AdminHeader'
import SideMenu from '../Components/Common/SideMenu'

export default class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {
            showSideMenu:false
        }

        this.handleShowMenu = this.handleShowMenu.bind(this)
    }

    componentWillMount(){
        //
    }

    handleShowMenu(){
        this.setState({showSideMenu: !this.state.showSideMenu})
    }

    render(){
        return (
            <div>
                <Header showSideMenu={this.handleShowMenu} /> 
                <SideMenu show={this.state.showSideMenu} />
            </div>
        )
    }
}