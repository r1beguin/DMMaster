
import { loadImage } from '../../actions/image'
import React, { Fragment, useEffect } from "react"
import './Battlemap.css'
import { connect } from "react-redux";



const Battlemap =({loadImage, image}) =>{

    useEffect(() => {
        loadImage();
      }, []);
    
   
    
        return(
            <Fragment>
                <div>
                    <img src={image} className="map" alt="map" />
                </div> 
            </Fragment>

        )
    
}


const mapStateToProps = state => ({
    image: state.image.data
  });

  export default connect(
    mapStateToProps, // connect store state to component props
    { loadImage} // connect actions for the component to modify store state
  )(Battlemap);