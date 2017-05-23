import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadAudioRef, selectSong, volumeChange, addSong, inputSearch, submitSearch, menuToggle} from '../actions/index';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

class DrawerMenu extends Component {
    render() {
        return (
          <div>
            <div className="menu-toggle" onMouseEnter={()=>{this.props.menuToggle()}} />

            <Drawer open={this.props.open}>
                <AppBar
                    title="Artists"
                    onLeftIconButtonTouchTap={()=>{this.props.menuToggle()}}
                    
                />
      
                {this.props.artists.map( function(artist, i) {
                    return( 
                        <MenuItem key={i} onTouchTap={()=>{this.props.addSong(artist.id)}}>
                            {artist.name}
                        </MenuItem>)
                    }, this) 
                }
            </Drawer>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        songs: state.songs,
        player: state.player,
        currentIndex: state.currentIndex,
        input: state.input,
        artists: state.artists,
        open: state.open
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectSong: selectSong,
        loadAudioRef: loadAudioRef, 
        volumeChange: volumeChange, 
        addSong: addSong, 
        inputSearch: inputSearch, 
        submitSearch: submitSearch,
        menuToggle: menuToggle}, 
    dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DrawerMenu);