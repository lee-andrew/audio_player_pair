import {combineReducers} from 'redux';
import PlayerReducer from './reducer-player';
import SongReducer from './reducer-songs';
import CurrentIndexReducer from './reducer-currentIndex';
import InputReducer from './reducer-input';
import ArtistReducer from './reducer-artists';
import MenuReducer from './reducer-open';

const allReducers = combineReducers({
    player: PlayerReducer,
    songs: SongReducer,
    currentIndex: CurrentIndexReducer,
    input: InputReducer,
    artists: ArtistReducer,
    open: MenuReducer
});

export default allReducers;