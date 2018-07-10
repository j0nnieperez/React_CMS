import React, {Component} from 'react'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import {Logo} from '../Resources/img';
import {UserModel} from "../Models"
import { Redirect } from "react-router-dom";

export default class Admin extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:"",
            pass:"",
            redirectToReferrer: false,
            InvalidPass: false,
            InvalidMail: false,
            message:""
        }
        this.OnAuth = this.OnAuth.bind(this)
    }

    componentWillMount(){
        const TokenAuth = localStorage.getItem('token-auth');
        if(TokenAuth !== null){
            this.setState({redirectToReferrer:true})
        }
    }

    async OnAuth(){

        const valid = await UserModel.Auth(this.state.user, this.state.pass)
        console.log(valid)
        if(valid.success){
            localStorage.setItem("token-auth", valid.TokenAuth)
            this.setState({redirectToReferrer:true})
        }else{
            this.setState({message:valid.message, InvalidMail:true, InvalidPass:true})
        }
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') this.OnAuth()
    }

    render(){
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            console.log("redirecting")
            return <Redirect to='/admin' />;
        }
        return (
            <div style={styles.From} >
                <img src={Logo.img} alt={Logo.alt} style={styles.Logo}  />
                <Form>
                    <p style={styles.ErrorMessage}>{this.state.message}</p>
                    <FormGroup>
                        <Input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={this.state.user} 
                            onChange={user => this.setState({user:user.target.value, InvalidMail:false})} 
                            placeholder="Email"
                            invalid={this.state.InvalidMail}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={this.state.pass} 
                            onSubmit={this.OnAuth}
                            onChange={pass => this.setState({pass:pass.target.value, InvalidPass:false})} 
                            placeholder="Contraseña" 
                            onKeyPress={this._handleKeyPress}
                            invalid={this.state.InvalidPass}
                        />
                    </FormGroup>
                    <Button color="primary" block onClick={this.OnAuth} >Entrar</Button>
                </Form>
            </div>
        )
    }
}

const styles = {
    From: {
        width:"40%",
        background:"#eee",
        position:"relative",
        margin:"auto",
        marginTop:100,
        paddingLeft:"10%",
        paddingRight:"10%",
        paddingBottom:"5%",
        paddingTop:"5%",
        borderRadius:"2%",
        boxShadow:"0px 2px 5px #aaa"
    },
    Logo:{
        width:"100%",
        marginBottom:50
    },
    ErrorMessage:{
        color:"#f44253",
        fontSize:12
    }
}