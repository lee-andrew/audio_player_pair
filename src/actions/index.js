import {getSongsApi} from '../api/songs-api';
import {getArtistApi} from '../api/artist-api';


export const selectSong = function(index) {
    return {
        type: 'SONG_SELECTED',
        payload: index
    }
};

export const loadDuration = function(duration) {
    return {
        type: 'LOAD_DURATION',
        payload: duration
    }
}

export const btnClicked = function(type, repeat, maxLength) {
    return {
        type: 'BTN_CLICKED_' + type,
        payload: {maxLength: maxLength, repeat: repeat}
    }
};

export const volumeChange = function(value) {
    return {
        type: 'VOLUME_CHANGE',
        payload: value
    }
};

export const seekingChange = function(value) {
    return {
        type: 'SEEKING_CHANGE',
        payload: value
    }
}

export const menuToggle = function(open) {
    return {
        type: 'MENU_TOGGLE',
        payload: open
    }
}

export const loadSong = function(topSongs) {
    return {
        type: 'LOAD_SONG',
        payload: topSongs
    }
}

export const addSong = function(input) {
    return function(dispatch){
        return getSongsApi(input).then( function(res) {
            dispatch(loadSong(res.data.tracks));  // Load Songs
        }).catch( function(err) {
            throw(err);
        });
    }
};

export const inputSearch = function(e) {
    return {
        type: 'INPUT_SEARCH',
        payload: e.target.value
    }
}

export const resetSearch = function() {
    return {
        type: 'RESET_SEARCH'
    }
}

export const loadArtists = function(artists) {
    return {
        type: 'LOAD_ARTISTS',
        payload: artists
    }
}

export const submitSearch = function(input) {
    if (input || input.trim() !== "") {
        return function(dispatch){
            return getArtistApi(input).then( function(res) {
                dispatch(loadArtists(res.data.artists.items));
                dispatch(resetSearch());  //reset
            }).catch( function(err) {
                throw(err);
            });
        }
    }
    else {
        return function(dispatch){
             dispatch(resetSearch());  //reset
        }
    }
}


