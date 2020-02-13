import React, { Fragment, useEffect } from "react"
import { connect } from "react-redux";
import FileBase64 from 'react-file-base64';
import './Upload.css'
import { loadImage, uploadImage } from '../../../actions/image'

const Upload = ({loadImage, uploadImage, image}) => {

    useEffect(() => {
        loadImage();
      }, []);
    

    return(
        <Fragment>

            <FileBase64 multiple={false} onDone={uploadImage.bind(this)} />
            <button onClick={e =>loadImage()}>load image</button>
            <img src={image} className="map" alt="map" />
            
        </Fragment>
    )
}

const mapStateToProps = state => ({
    image: state.image.data
  });

  export default connect(
    mapStateToProps, // connect store state to component props
    { loadImage, uploadImage} // connect actions for the component to modify store state
  )(Upload);