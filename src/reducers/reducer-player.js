const initialState = {
    ref: null,
    volume: 100,
    paused: true,
    repeat: false,
    shuffle: false,
    test: "TEST"
}

export default function(state=initialState, action) {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case 'LOAD_AUDIO_REF':
            newState.ref = action.payload
            return newState;
        
        case 'BTN_CLICKED_PAUSE_PLAY':
            newState.paused = !newState.paused;
            return newState;
            
        case 'BTN_CLICKED_REPEAT':
            newState.repeat = !newState.repeat;
            return newState;
            
        
        case 'VOLUME_CHANGE':
            newState.volume = action.payload;
            return newState;
            
            
        default:
            return state;
    }
}