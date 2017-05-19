import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AudioPlayer from './AudioPlayer';
import {loadAudioRef, selectSong, volumeChange, addSong, inputSearch, submitSearch} from '../actions/index';

class Search extends Component {
    constructor () {
        super();
        this.getImgSrc = this.getImgSrc.bind(this);
    }
    
    getImgSrc(i) {
        if (this.props.artists[i].images.length > 0) {
            return this.props.artists[i].images[this.props.artists[i].images.length - 1].url;
        }
        else {
            return "";
        }
    }
    
    render() {
        return (
        <div>
           <ol>
                {this.props.songs.map( function(song, i) {
                    return <li key={i} onClick={()=>{this.props.selectSong(i)}} >{song.title}</li>
                }, this)}
           </ol>
           <AudioPlayer />
           {this.props.songs[this.props.currentIndex].title}
           
           <div>
           <form onSubmit={(e)=>{ e.preventDefault(); this.props.submitSearch(this.props.input)}}>
                <input type="text" onChange={this.props.inputSearch} value={this.props.input} />
                {this.props.input}
                <button type="submit" > SUBMIT </button>
            </form>
           </div>
       
           <ol>
            {this.props.artists.map( function(artist, i) {
                return( 
                <li key={i} onClick={()=>{this.props.addSong(artist.id)}}>
                    {artist.name + " -------- " + artist.id}
                    <img src={this.getImgSrc(i)} alt=""/>
                </li>)
            }, this) }
            </ol>
         </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        songs: state.songs,
        player: state.player,
        currentIndex: state.currentIndex,
        input: state.input,
        artists: state.artists
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectSong: selectSong,
        loadAudioRef: loadAudioRef, 
        volumeChange: volumeChange, 
        addSong: addSong, 
        inputSearch: inputSearch, 
        submitSearch: submitSearch}, 
    dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);