import React, {Component} from 'react'
import '../../Resources/css/SideMenu.css'
import { Link } from 'react-router-dom'

export default class SideMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            items:[
                {name:'Inicio', link:'/admin', icon: 'icon-home'},
                {name:'Ver Sitio', link:'/', icon: 'icon-desktop_windows'},
                {name:'Admin Database', link:'/admin/database', icon: 'icon-storage'},
                {name:'Cerrar Sesion', link:'/logout', icon:'icon-exit_to_app' }
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
                <div className="SeparateItem"></div>
                {this.state.items.map((item, index) => (
                    <Link key={index} className='ItemLink' to={item.link}> 
                        <span className={item.icon} />
                        {item.name} 
                    </Link> 
                ) )}
            </div>
        )
    }
}
