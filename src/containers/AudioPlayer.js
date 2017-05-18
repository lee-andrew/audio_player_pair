import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadAudioRef} from '../actions/index';

class AudioPlayer extends Component {
    
    render() {
        let songs = this.props.songs;
        let index = this.props.currentIndex;
        return (
        <div>
           <audio controls ref="audio" onLoadStart={()=>{this.props.loadAudioRef(this.refs.audio)}} src={songs[index].source} />
         </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        songs: state.songs,
        player: state.player,
        currentIndex: state.currentIndex
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({loadAudioRef: loadAudioRef}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AudioPlayer);