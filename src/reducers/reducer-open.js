export default function(state=false, action) {
    switch(action.type) {
        case 'MENU_TOGGLE':
            if(action.payload ) {
                return action.payload;
            }
            return !state;
        default:
            return state;
    }
}