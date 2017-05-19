import axios from 'axios';

export const getArtistApi = function(input) {
    const url = "https://api.spotify.com/v1/search?q=" + encodeURI(input) + "&type=artist";
 
    return axios.get(url).then( function(res) {
        console.log(res);
        return res;
    }).catch( function(err) {
        return err;
    });
};