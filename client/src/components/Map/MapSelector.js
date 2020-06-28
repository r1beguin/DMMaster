import {Box, DropButton, Image} from "grommet";
import React from "react";
import {FileBase64} from "react-file-base64";
import {connect} from "react-redux";
import {setActiveImage, uploadImage} from "../../actions/image";

const MapSelector = ({images, uploadImage, setActiveImage}) => {

    console.log(images)

    return <Box width="xsmall" margin="xsmall" gap="small">
        <DropButton
            label="Maps"
            color="grey"
            dropContent={
                <Box align="center">
                    {images.map((img) => (
                        <Box
                            key={img.name}
                            border={{ color: "accent-2" }}
                            width="xsmall"
                            height="xsmall"
                            margin="xsmall"
                            onClick={() => setActiveImage(img)}
                        >
                            <Image src={img.data} fit="cover"/>
                        </Box>
                    ))}
                    <Box margin="xsmall" direction="row" alignContent="center">
                        <Box alignContent="center">
                            <FileBase64
                                multiple={false}
                                onDone={uploadImage.bind(this)}
                            />
                        </Box>
                    </Box>
                </Box>
            }
        />
    </Box>
}

const mapStateToProps = (state) => ({
    images: state.image.imageList
});

export default connect(
    mapStateToProps, // connect store state to component props
    {
        setActiveImage,
        uploadImage
    } // connect actions for the component to modify store state
)(MapSelector);