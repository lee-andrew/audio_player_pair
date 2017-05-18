export const selectSong = function(index) {
    console.log(index);
    return {
        type: 'SONG_SELECTED',
        payload: index
    }
};

export const loadAudioRef = function(ref) {
    return {
        type: 'LOAD_AUDIO_REF',
        payload: ref
    }
};

export const volumeChange = function(e) {
    return {
        type: 'VOLUME_CHANGE',
        payload: e.target.value
    }
};