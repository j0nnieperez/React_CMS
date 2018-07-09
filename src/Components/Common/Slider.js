import React, {Component} from 'react';
import {Slide1, Slide2} from '../../Resources/img';
import '../../Resources/css/Slider.css'
import * as Icon from 'react-icons/lib/io';

export default class Slider extends Component {

    constructor(props){
        super(props);
        this.state = {
            slides:[
                Slide1,
                Slide2,
            ],
            timeForSlider: 10,
            positionSlider: 0,
            positionEditable: true,
            height: 500,
            iconBackColor:'#fff',
            iconNextColor:'#fff',
            sliderMotionInProgres: false,
            onBackInProgres: false,
            onNextInProgres: false
        }

        this.sliderMotion = this.sliderMotion.bind(this)
        this.OnBack = this.OnBack.bind(this)
        this.OnNext = this.OnNext.bind(this)
    }

    sliderMotion(){
        if(!this.state.sliderMotionInProgres){
            this.setState({sliderMotionInProgres:true})
            setTimeout( () => { 
                const position = this.state.positionSlider
                let positionSlider = 0
                if( ((this.state.slides.length-1) * -100) !== this.state.positionSlider){
                    positionSlider = position - 100;
                }
                if(this.state.positionEditable & this.state.sliderMotionInProgres){
                    this.setState({positionSlider, sliderMotionInProgres:false}) 
                }else{
                    this.setState({sliderMotionInProgres:false}) 
                }
            }, this.state.timeForSlider * 1000);
        }
    }

    OnBack(){
        if(this.state.positionSlider !== 0){
            this.setState({positionSlider: this.state.positionSlider+100, positionEditable: false, onBackInProgres: true})
            setTimeout(() => {
                if(!this.state.onNextInProgres){
                    this.setState({positionEditable:true, onBackInProgres:false})
                }else{
                    this.setState({onBackInProgres:false})
                }
            }, this.state.timeForSlider * 1000)
        }
    }

    OnNext(){
        if(((this.state.slides.length-1) * -100) !== this.state.positionSlider){
            this.setState({positionSlider: this.state.positionSlider-100, positionEditable: false, onNextInProgres: true })
            setTimeout(() => {
                if(!this.state.onBackInProgres){
                    this.setState({positionEditable:true, onNextInProgres: false})
                }else{
                    this.setState({onNextInProgres: false})
                }
            }, this.state.timeForSlider * 1000)
        }
    }

    render(){ 
        this.sliderMotion();
        return (
        <div style={styles.sliderFullContent} >
            <div style={{...styles.controlIcons, paddingTop:((this.state.height/2)-25) }} >
                <Icon.IoIosArrowBack    
                    onMouseEnter={() => this.setState({iconBackColor:'#000'})} 
                    onMouseLeave={() => this.setState({iconBackColor:'#fff'})} 
                    onClick={this.OnBack}
                    style={{fontSize:50, float:'left',  cursor:'pointer', color:this.state.iconBackColor}} 
                />
                <Icon.IoIosArrowForward 
                    onMouseEnter={() => this.setState({iconNextColor:'#000'})} 
                    onMouseLeave={() => this.setState({iconNextColor:'#fff'})} 
                    onClick={this.OnNext}
                    style={{fontSize:50, float:'right', cursor:'pointer', color:this.state.iconNextColor}} 
                />
            </div>
            <div style={{...styles.sliderContent, marginLeft: this.state.positionSlider+'%', height:this.state.height }} > 
                {this.state.slides.map(slide => 
                    <div key={slide.alt} style={{...styles.slide, backgroundImage:`url(${slide.img})`, height:this.state.height}} >
                    </div>
                )}
            </div>
        </div>
    )}
}

const styles = {
    controlIcons:{
        position:'absolute',
        width:'100%'
    },
    sliderFullContent:{
        width:'100%',
        overflow:'hidden'
    },
    sliderContent:{
        width:'200%',
        display:'flex',
        transition: 'all 2s'
    },
    slide:{
        width:'100%',
        backgroundSize:'cover',
    }
}