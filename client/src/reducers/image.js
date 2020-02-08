import{
    MAP_SAVED,
    MAP_LOADED
} from "../actions/types"


const initialState = {
    name : "",
    data: ""
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case MAP_LOADED:
            return{
                name:payload.imageDame,
                data:payload.imageData
            }
        case MAP_SAVED:
            return{
                ...state,
                ...payload
            }
            
        default :
        return state;
    }
}
