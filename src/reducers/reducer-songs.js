function Song(source, title, id, image, artists) {
    this.source = source;
    this.title = title;
    this.id = id;
    this.image = image;
    this.artists = artists;
}

const initialState = [
    new Song('/upstep.mp3', 'Upstep', 0, null, null),
    new Song('/olympian.mp3', 'Olympian', 1, null, null),
    new Song('/transmission.mp3', 'Transmission', 2, null, null)
]

export default function(state=initialState, action) {
    switch(action.type) {
        case 'LOAD_SONG':
            let tmpArr = []; 
            let topSongs = action.payload;
            let id = 0;
            
            for ( let i = 0; i < topSongs.length; i++ ) {
                if ( 'preview_url' in topSongs[i] ) {
                    tmpArr.push(new Song(topSongs[i].preview_url, topSongs[i].name , id++, topSongs[i].album.images[0].url, topSongs[i].artists))
     
                }
            }
            return tmpArr;
        default:
            return state;
    }
}