export default function(state=[], action) {
    switch(action.type) {
        case 'LOAD_ARTISTS':
            return action.payload;
            
        default:
            return state;
    }
}