import React, {useEffect} from "react";
import {Box, Image, Text} from "grommet";

const InitiativeTracker = ({ name, active, src, margin }) => {

    useEffect(() => {
        scrollIfNeeded()
    }, []);

    const scrollIfNeeded = () => {
        if (ref.current && active) {
            ref.current.scrollIntoView({behavior: "smooth", block: "start", inline: "start"})
        }
    }

    const ref = React.useRef(null)

    scrollIfNeeded()

    return (
        <Box ref={ref}>
            <Box
                margin={margin}
                justify="center"
                alignContent="center"
                round="xsmall"
                overflow="hidden"
                basis="auto"
                flex={{shrink: 0, grow: 0}}
                background={active ? "neutral-1" : "neutral-2"}>
                <Box
                    width="xxsmall"
                    height="xxsmall"
                    overflow="hidden"
                    basis="auto"
                    flex={{shrink:0, grow: 0}}
                >
                    <Image fit="cover" alt="portrait" src={src} />
                </Box>
                <Box basis="auto" pad="xsmall"><Text weight="bold" size="xsmall" textAlign="center">{name}</Text></Box>
            </Box>
        </Box>
    );
};

export default InitiativeTracker;
