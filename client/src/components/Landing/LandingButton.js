import React from "react"
import {Box, Image, RoutedAnchor, Text} from "grommet";
import {Link} from "react-router-dom";
import master from "../../images/master.svg";
import {withRouter} from 'react-router-dom'
import './LandingButton.css'

const LandingButton = (props) => {

    return <Box className="landing-button" fill="true" align="center" justify="around" background="brand" round="small" onClick={() => props.history.push(props.to)}>
            <Box basis="1/3" overflow="hidden" alignSelf="stretch">
                <Image src={props.image} color="blue" fit="contain"/>
            </Box>
            <Box>
                <Text weight="bold" size="xxlarge" color="white">{props.text}</Text>
            </Box>
        </Box>
}

export default withRouter(LandingButton)