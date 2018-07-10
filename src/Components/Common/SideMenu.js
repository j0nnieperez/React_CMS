import React, {Component} from 'react'
import {MdAddBox} from 'react-icons/lib/md';
import '../../Resources/css/SideMenu.css'
import { Link } from 'react-router-dom'

export default class SideMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            items:[
                {name:'Ver Sitio', link:'/'},
                {name:'Cerrar Sesion', link:'/logout'}
            ],
            show:false
        }
    }

    componentWillReceiveProps(props){
        if(props.show !== undefined){
            this.setState({show:props.show})
        }
    }

    render(){
        return (
            <div style={this.state.show?{marginLeft:0}:{marginLeft:'-25%'}} className='SideMenu' >
                {this.state.items.map(item => (
                    <p className='ItemLink' > <Link to={item.link} > <MdAddBox className='ItemIcon' /> {item.name} </Link> </p>
                ) )}
            </div>
        )
    }
}
