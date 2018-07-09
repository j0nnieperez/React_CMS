import React, {Component} from 'react'
import {IoAndroidMenu, IoAndroidArrowBack} from 'react-icons/lib/io';
import '../../Resources/css/AdminHeader.css'
import {AdminPanel, AppTexts} from '../../DefaultText/App'

export default class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {
            iconMenu: true
        }

        this.handleShowMenu = this.handleShowMenu.bind(this)
    }

    handleShowMenu(){
        this.props.showSideMenu()
        this.setState({iconMenu: !this.state.iconMenu})
    }

    render(){
        return (
            <div className='Header' >
                {this.state.iconMenu ?
                    <IoAndroidMenu className='IconWhite' onClick={this.handleShowMenu} /> :
                    <IoAndroidArrowBack className='IconWhite' onClick={this.handleShowMenu} /> 
                }
                <h1 className='title' >{ AdminPanel.title + AppTexts.AppTitle}</h1>
            </div>
        )
    }
}
