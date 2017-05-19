function Song(source, title, description, id) {
    this.source = source;
    this.title = title;
    this.id = id;
}

const initialState = [
    new Song('/upstep.mp3', 'Upstep',  0),
    new Song('/olympian.mp3', 'Olympian', 1),
    new Song('/transmission.mp3', 'Transmission', 2)
]

export default function(state=initialState, action) {
    switch(action.type) {
        case 'LOAD_SONG':
            let tmpArr = []; // Copy state array
            let topSongs = action.payload
            for ( let i = 0; i < topSongs.length; i++ ) {
                if ( 'preview_url' in topSongs[i] ) {
                    tmpArr.push(new Song(topSongs[i].preview_url, topSongs[i].name ,32))
                }
            }
            return tmpArr;
        default:
            return state;
    }
}