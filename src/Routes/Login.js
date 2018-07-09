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
            redirectToReferrer: false
        }
        this.OnAuth = this.OnAuth.bind(this)
    }

    async OnAuth(){
        const valid = await UserModel.Auth(this.state.user, this.state.pass)
        if(valid.success){
            localStorage.setItem("token-auth", UserModel.GetToken(this.state.user, this.state.pass))
            this.setState({redirectToReferrer:true})
        }
    }

    render(){
        const { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to='/login' />;
        }
        return (
            <div style={styles.From} >
                <img src={Logo.img} alt={Logo.alt} style={styles.Logo}  />
                <Form>
                    <FormGroup>
                        <Input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={this.state.user} 
                            onChange={user => this.setState({user:user.target.value})} 
                            placeholder="Email" 
                            />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={this.state.pass} 
                            onSubmit={this.OnAuth}
                            onChange={pass => this.setState({pass:pass.target.value})} 
                            placeholder="Contraseña" 
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
    }
}