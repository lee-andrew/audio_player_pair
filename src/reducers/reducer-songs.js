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
    return state;
}