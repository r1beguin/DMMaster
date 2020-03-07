import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import FileBase64 from "react-file-base64";
import "./Upload.css";
import { loadImage, uploadImage, loadImageList } from "../../../actions/image";

const Upload = ({ loadImage, uploadImage, image, loadImageList, images }) => {
  useEffect(() => {
    //loadImage();
    loadImageList();
  }, []);

  const loadClickedImage = event => {
    console.log(
      "id onclick",
      images.find(i => i.imageName === event.target.name)
    );
    loadImage(images.find(i => i.imageName === event.target.name));
  };

  const renderImageList = imagesList =>
    imagesList.map(img => (
      <div>
        <img
          key={img._id}
          src={img.imageData}
          name={img.imageName}
          onClick={e => loadClickedImage(e)}
          className="imageList"
          alt="list"
        ></img>
      </div>
    ));

  return (
    <Fragment>
      <FileBase64 multiple={false} onDone={uploadImage.bind(this)} />
      <button onClick={e => loadImage(image)}>load image</button>
      <img src={image} className="map" alt="map" />
      <div>{renderImageList(images)}</div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  image: state.image.data,
  images: state.image.imageList
});

export default connect(
  mapStateToProps, // connect store state to component props
  { loadImage, uploadImage, loadImageList } // connect actions for the component to modify store state
)(Upload);
