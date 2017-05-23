import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadDuration, volumeChange, btnClicked, seekingChange} from '../actions/index';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import PrevIcon from 'material-ui/svg-icons/av/skip-previous';
import NextIcon from 'material-ui/svg-icons/av/skip-next';
import RepeatIcon from 'material-ui/svg-icons/av/repeat';
import VolumeUpIcon from 'material-ui/svg-icons/av/volume-up';
import VolumeMuteIcon from 'material-ui/svg-icons/av/volume-mute';

const styles = {
    smallIcon: {
        width: 36,
        height: 36,
    },
    smallIconGrey: {
        width: 36,
        height: 36,
        fill: '#e2e2e2',
    },
    small: {
        width: 72,
        height: 72,
        padding: 16,
    },
};

class AudioPlayer extends Component {
    constructor() {
        super();
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.handleSeekingChange = this.handleSeekingChange.bind(this);
        this.durationFormat = this.durationFormat.bind(this);
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(!this.props.player.paused) { // Play song if current state is not paused
            this.refs.audio.play();
        }
    }
    
    // Function to handle multiple button types
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
    
    handleVolumeChange(e, value) {
        let newVolume = Math.round(value);
        this.refs.audio.volume = newVolume / 100; // Change DOM Element for volume (0 - 1)
        this.props.volumeChange(newVolume);    // Set State for volume (0 - 100)
    }
    
    handleSeekingChange(e, value) {        
        this.refs.audio.currentTime = value;    // Change DOM Element for current time
        this.props.seekingChange(value);        // Set State for current time
    }
    
    durationFormat(duration){   // Change seconds format into minutes and seconds
        let minutes = Math.floor(duration / 60);
        let seconds = Math.round(duration) - (minutes * 60);
        if (seconds < 10 ) {
            seconds = "0" + seconds;
        }
        let newStr = minutes + ":" + seconds;
        if (newStr.indexOf(":")+2 === newStr.length) {
            newStr = newStr + 0;
        }
        return newStr;
    }
    
    render() {
        let songs = this.props.songs;
        let index = this.props.currentIndex;
        let repeat = this.props.player.repeat;
        let pauseBtn = (this.props.player.paused)? "PLAY" : "PAUSE";
        let repeatBtn = (this.props.player.repeat)? "REPEAT IS ON" : "REPEAT IS OFF";
        let pauseIcon = (this.props.player.paused)? <PlayIcon /> : <PauseIcon />
        let repeatIcon = (repeat)? styles.smallIcon : styles.smallIconGrey;
        let volumeIcon = (this.props.player.volume===0)?  <VolumeMuteIcon /> : <VolumeUpIcon />
        
        return (
        <div className="audio-player">
            <audio ref="audio" 
                src={songs[index].source}
                onLoadedData={()=>{this.props.loadDuration(this.refs.audio.duration)}} 
                onEnded={()=>{this.handleBtnClick('NEXT', repeat, songs.length)}}
                onTimeUpdate={()=>{this.props.seekingChange(this.refs.audio.currentTime)}}
            />
           
            <div className="audio-player__left">
                <div className="scroll-left">
                    <p className="audio-player-song"> {songs[index].title}</p>
                </div>
            </div>
           
            <div className="audio-player__center">
                <div className="audio-player-controls">
                    <IconButton iconStyle={styles.smallIcon} style={styles.small} onClick={()=>{this.handleBtnClick('PREV', repeat, songs.length)}} title={"PREVIOUS"} >
                        <PrevIcon />
                    </IconButton>
                    <IconButton iconStyle={styles.smallIcon} style={styles.small} onClick={()=>{this.handleBtnClick('PAUSE_PLAY')}} title={pauseBtn}>
                        {pauseIcon}
                    </IconButton>
                    <IconButton iconStyle={styles.smallIcon} style={styles.small} onClick={()=>{this.handleBtnClick('NEXT', repeat, songs.length)}} title={"NEXT"}>
                        <NextIcon />
                    </IconButton>
                    <IconButton iconStyle={repeatIcon} style={styles.small} onClick={()=>{this.props.btnClicked('REPEAT')}} title={repeatBtn}>
                        <RepeatIcon />
                    </IconButton>
                </div>
                
                <div className="audio-player-seeking">
                    <div className="audio-player-current-time">
                        {this.durationFormat(this.props.player.currentTime)}
                    </div>
                    <div className="audio-player-seeker"> 
                        <Slider className="seeking-slider" 
                            min={0} 
                            max={this.props.player.duration+1} 
                            value={this.props.player.currentTime} 
                            onChange={this.handleSeekingChange}
                        />
                    </div>
                    <div className="audio-player-duration">
                        {this.durationFormat(this.props.player.duration)}
                    </div>
                </div>
            </div>
           
            <div className="audio-player__right">
                <Slider className="volume-slider" 
                    min={0} 
                    max={100} 
                    value={this.props.player.volume} 
                    onChange={this.handleVolumeChange} 
                />
            
                <IconButton className="volume-icon" 
                    iconStyle={styles.smallIcon} 
                    style={styles.small} 
                    onClick={(e)=>{ 
                        if(this.props.player.volume === 0) 
                            {this.handleVolumeChange(e, 100)} 
                        else
                            {this.handleVolumeChange(e, 0)}}} 
                >
                    {volumeIcon}
                </IconButton>
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
        loadDuration: loadDuration,
        volumeChange: volumeChange, 
        btnClicked: btnClicked,
        seekingChange: seekingChange
    }, 
    dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AudioPlayer);