import {Box, Image} from "grommet";
import React from "react";

const CreatureToken = (props) => {
    return <Box
        width={props.size + (isNaN(props.size) ? "" : "px")}
        height={props.size + (isNaN(props.size) ? "" : "px")}
        round="full"
        overflow="hidden"
        className={props.className}
    >
        <Image src={props.image} fit="cover" onDragStart={e=>e.preventDefault()}/>
    </Box>
}

export default CreatureToken