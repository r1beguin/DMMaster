import {Box, Image} from "grommet";
import React from "react";

const CreatureToken = (props) => {
    return <Box
        width="xxsmall"
        height="xxsmall"
        round="full"
        overflow="hidden"
    >
        <Image src={props.image} fit="cover" onDragStart={e=>e.preventDefault()}/>
    </Box>
}

export default CreatureToken