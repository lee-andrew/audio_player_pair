import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadAudioRef, volumeChange, btnClicked} from '../actions/index';

class AudioPlayer extends Component {
    constructor() {
        super();
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        
    }
    
    handleBtnClick(type, repeat, maxLength) {
        switch(type) {
            case 'PAUSE_PLAY':
                if ( this.props.player.paused ) {
                    this.refs.audio.play();
                    this.props.btnClicked(type);
                }
                else {
                   this.refs.audio.pause();
                   this.props.btnClicked(type);
                }
                break;
            
            case 'PREV':
                this.props.btnClicked(type, repeat, maxLength);
                break;
            
            case 'NEXT':
                this.props.btnClicked(type, repeat, maxLength);
                break;
            
            case 'REPEAT':
                this.props.btnClicked(type);
                break;
            
            default:
                break;
        }
    }
    
    handleVolumeChange(e) {
        let newVolume = e.target.value / 100;
        this.refs.audio.volume = newVolume; // Change DOM Element
        this.props.volumeChange(e.target.value);    // Set State
    }
    
    render() {
        let songs = this.props.songs;
        let index = this.props.currentIndex;
        let repeat = this.props.player.repeat;
        let pauseBtn = (this.props.player.paused)? "PLAY" : "PAUSE";
        let repeatBtn = (this.props.player.repeat)? "REPEAT IS ON" : "REPEAT IS OFF";
        return (
        <div>
           <audio controls ref="audio" onLoadStart={()=>{this.props.loadAudioRef(this.refs.audio)}} src={songs[index].source} />
           <div>
                <button onClick={()=>{this.handleBtnClick('PREV', repeat, songs.length)}}> PREV </button>
                <button onClick={()=>{this.handleBtnClick('PAUSE_PLAY')}}> {pauseBtn} </button>
                <button onClick={()=>{this.handleBtnClick('NEXT', repeat, songs.length)}}> NEXT </button>
                <button onClick={()=>{this.handleBtnClick('REPEAT')}}> {repeatBtn} </button>
                
           </div>
           
           <div>
            <input type="range" min={0} max={100} value={this.props.player.volume} onChange={this.handleVolumeChange}  />
               {this.props.player.volume}
               
           </div>
         </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        songs: state.songs,
        player: state.player,
        currentIndex: state.currentIndex,
        input: state.input
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        loadAudioRef: loadAudioRef, 
        volumeChange: volumeChange, 
        btnClicked: btnClicked, 
    }, 
    dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AudioPlayer);