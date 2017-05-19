export default function(state="", action) {
    switch(action.type) {
        case 'INPUT_SEARCH':
            return action.payload;
        
        case 'RESET_SEARCH':
            return "";
        
        default:
            return state;
    }
}