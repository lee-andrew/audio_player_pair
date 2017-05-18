import {combineReducers} from 'redux';
import PlayerReducer from './reducer-player';
import SongReducer from './reducer-songs';
import CurrentIndexReducer from './reducer-currentIndex';

const allReducers = combineReducers({
    player: PlayerReducer,
    songs: SongReducer,
    currentIndex: CurrentIndexReducer
});

export default allReducers;