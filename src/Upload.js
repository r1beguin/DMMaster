import React, { Component } from "react"

import './Upload.css'
import Draggable from './Draggable'

class Upload extends Component{

    constructor(){
        super();
        var init = localStorage.getItem('imgUpload')
        this.state={
            imgUpload: init
        }
        this.handleChange = this.handleChange.bind(this)
    }

    

      handleChange(event) {
        localStorage.setItem( 'imgUpload', URL.createObjectURL(event.target.files[0]) );
        this.setState({
          imgUpload: URL.createObjectURL(event.target.files[0]),
          
        })
        console.log(this.state.imgUpload)
      }

      
     


    render(){

    
        if (localStorage.getItem('imgUpload') === null){
            return(

                <div className="dmscreen">
                    <input className="uploadMap" type="file" onChange={this.handleChange}/>
                    <Draggable>
                        <svg height="100" width="100">
                            <circle cx="50" cy="50" r="15" stroke="black" stroke-width="3" fill="red" />
                        </svg>
                    </Draggable>
                </div>
                

            )
           
        }else {
            return(
                <div className="dmscreen">
                    <input className="uploadMap" type="file" onChange={this.handleChange}/>
                    <img className="map" alt="map" src={localStorage.getItem('imgUpload')} />
                  
                    <Draggable>
                        <svg height="100" width="100">
                            <circle cx="50" cy="50" r="15" stroke="black" stroke-width="3" fill="red" />
                        </svg>
                    </Draggable>
                </div>
            )
        }
    }

    
}

export default Upload