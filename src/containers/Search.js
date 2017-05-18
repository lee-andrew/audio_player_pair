import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AudioPlayer from './AudioPlayer';
import {selectSong, volumeChange} from '../actions/index';

class Search extends Component {
    render() {
        let test = (this.props.player.ref)? Math.round(this.props.player.ref.volume * 100) : "";
        return (
        <div>
           <ol>
                {this.props.songs.map( function(song, i) {
                    return <li key={i} onClick={()=>{this.props.selectSong(i)}} >{song.title}</li>
                }, this)}
           </ol>
           <AudioPlayer />
           <input type="range" min={0} max={100} onChange={this.props.volumeChange} />
               {test}
         </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        songs: state.songs,
        player: state.player
    }
}

function matchDispatchToProps(dispatch) {
     return bindActionCreators({selectSong: selectSong, volumeChange: volumeChange}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);