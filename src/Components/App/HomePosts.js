import React, {Component} from 'react'
import { HomePostText } from '../../Resources/DefaultText/App'

export default class HomePosts extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <div style={styles.parentContent} >
                <h1>{HomePostText.title}</h1>
            </div>
        )
    }
}

const styles = {
    parentContent:{
        width:'80%',
        paddingLeft:'10%',
        fontSize:14,
        paddingRight:'10%',
        paddingTop:40,
        marginTop:10,
        height:500,
    }
}