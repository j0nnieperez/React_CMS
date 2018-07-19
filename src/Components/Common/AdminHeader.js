import React, {Component} from 'react'
import '../../Resources/css/AdminHeader.css'
import {AdminPanel, AppTexts} from '../../Resources/DefaultText/App'

export default class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {
        }

        this.handleShowMenu = this.handleShowMenu.bind(this)
    }

    handleShowMenu(){
        this.props.showSideMenu()
    }

    render(){
        return (
            <div className='Header' >
                <span 
                    className={!this.props.SideMenuShowed ? "IconWhite icon-menu" : "IconWhite icon-arrow_back"}
                    onClick={this.handleShowMenu}
                ></span>
                <h1 className='title' >{ AdminPanel.title + AppTexts.AppTitle}</h1>
            </div>
        )
    }
}
