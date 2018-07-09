import React, { Component } from 'react';
import {Logo} from '../../Resources/img'
import { Link } from 'react-router-dom'

export default class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            menuItems:[
                {   
                    id:1,
                    label:  'Home',
                    url:    '/',
                    hover: false,
                    active:true
                },
                {   
                    id:2,
                    label:  'Tutoriales',
                    url:    'tutoriales',
                    hover: false,
                    active:false
                },
                { 
                    id:3,
                    label:  'Acerca de',
                    url:    'about',
                    hover: false,
                    active:false
                },
            ]
        }
    }

    render(){ return (
        <header style={styles.header} >
            {Logo !== undefined ?
                <img alt={Logo.alt} src={Logo.img} style={styles.imgLogo} />
                :
                <h1 style={styles.logo} >J0NNIE</h1>
            }

            <div style={styles.menu} >
                {this.state.menuItems.map(item => 
                    <Link key={item.id} style={{
                        ...styles.urlMenuItem, color:item.hover?'#333':'#333'
                    }} to={item.url} >
                        <div 
                            onMouseEnter={() => {
                                this.state.menuItems.filter(FItem => FItem.id === item.id)[0].hover = true;
                                this.forceUpdate();
                            }} 
                            onMouseLeave={() => {
                                this.state.menuItems.filter(FItem => FItem.id === item.id)[0].hover = false;
                                this.forceUpdate();
                            }} 
                            onClick={() => {
                                this.state.menuItems.map(FItem => {
                                    if(FItem.id === item.id){
                                        FItem.active = true
                                    }else{
                                        FItem.active = false
                                    }
                                    return true
                                });
                                this.forceUpdate();
                            }}
                            style={{...styles.menuItem, 
                                borderBottom:item.hover?'5px solid #333':'0px solid #333',
                                marginBottom:item.hover?'0px':'5px'
                            }} 
                        >
                            <h1 style={{fontSize:18, marginTop:-60, transition:'all 1s', height:50, 
                            color:this.props.location.pathname === "/"+item.url?'rgb(21,182,184)':'#000' }} 
                            >
                                {item.label}
                            </h1>
                        </div>
                    </Link>
                )}
            </div>
            
        </header>
    )}
}

const styles = {
    imgLogo:{
        zIndex:1000,
        position:'relative',
        width:360,
        marginLeft:50
    },
    header:{
        height:70,
        lineHeight:'70px',
        marginBottom:10
    },
    logo:{
        display:'inline-block',
        marginLeft:25
    },
    menu:{
        display:'inline-block',
        float:'right',
        marginRight:90
    },
    menuItem:{
        display:'inline-block',
        marginTop:10,
        paddingLeft:20,
        paddingRight:20,
        transition:'all 0.3s',
        textAlign:'center'
    },
    urlMenuItem:{
        transition:'all 1s',
        textDecoration:'none'
    },
    icons:{
        fontSize:30, 
        color:"#333", 
        marginTop:-30
    }
}