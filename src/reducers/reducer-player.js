const initialState = {
    ref: null,
    shuffle: false,
    test: "TEST"
}

export default function(state=initialState, action) {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case 'LOAD_AUDIO_REF':
            newState.ref = action.payload
            return newState;
        
        case 'VOLUME_CHANGE':
            let volume = action.payload / 100;
            newState.ref.volume = volume;
            return newState;
            
            
        default:
            return state;
    }
}