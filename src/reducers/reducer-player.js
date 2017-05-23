const initialState = {
    volume: 100,
    paused: true,
    repeat: false,
    shuffle: false,
    currentTime: 0,
    duration: null,
}

export default function(state=initialState, action) {
    let newState = Object.assign({}, state);    // Make copy of object to avoid mutation
    switch(action.type) {            
        case 'LOAD_DURATION':
            newState.duration = action.payload;
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
            
        case 'SEEKING_CHANGE':
            newState.currentTime = action.payload;
            return newState;
            
        default:
            return state;
    }
}