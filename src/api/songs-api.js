import axios from 'axios';

export const getSongsApi = function(input) {
    const url = "https://api.spotify.com/v1/artists/" + input + "/top-tracks?country=US";
 
    return axios.get(url).then( function(res) {
        console.log(res);
        return res;
    }).catch( function(err) {
        return err;
    });
};