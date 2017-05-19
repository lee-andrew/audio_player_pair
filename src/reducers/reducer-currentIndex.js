export default function(state=0, action) {
    let adder;
    switch(action.type) {
        case 'SONG_SELECTED':
            return action.payload;
            
        case 'BTN_CLICKED_PREV':
            if(action.payload.repeat) {
                if ( state <= 0 ) {
                    adder = action.payload.maxLength - 1;
                }
                else {
                    adder = -1;
                }
            }
            else {
                adder = ( state > 0 )? -1 : 0;
            }
            
            return state + adder;
            
        case 'BTN_CLICKED_NEXT':
            if(action.payload.repeat) {
                if ( state >= action.payload.maxLength - 1 ) {
                    adder = -(action.payload.maxLength - 1);
                }
                else {
                    adder = 1;
                }
            }
            else {
                adder = ( state < action.payload.maxLength - 1 )? 1 : 0;
            }
           
            return state + adder;
            
        default:
            return state;
    }
}