import React, { Component } from "react"

import './Upload.css'


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
                    
                </div>
                

            )
           
        }else {
            return(
                <div className="dmscreen">
                    <input className="uploadMap" type="file" onChange={this.handleChange}/>
                    <div className="map">
                        <img  alt="map" src={localStorage.getItem('imgUpload')} style={this.state.size}/>
                    </div>

                    
                    
                </div>
            )
        }
    }

    
}

export default Upload