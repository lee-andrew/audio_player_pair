import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AudioPlayer from './AudioPlayer';
import {selectSong, volumeChange, addSong, inputSearch, submitSearch, menuToggle} from '../actions/index';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import SearchButton from 'material-ui/svg-icons/action/search';
import Avatar from 'material-ui/Avatar';
import {cyan500} from 'material-ui/styles/colors';
import DrawerMenu from './DrawerMenu';
import {Card, CardMedia} from 'material-ui/Card';


const styles = {
    smallIcon: {
        width: 36,
        height: 36,
    },
    small: {
        width: 72,
        height: 72,
        padding: 16,
    },
};

class Search extends Component {
    constructor () {
        super();
        this.showCard = this.showCard.bind(this);
        this.showArtists = this.showArtists.bind(this);
    }
    
    showCard(arr, i) {
        if (arr[i].image) {
            return true;
        }
            return false;
    }
    
    showArtists(arr) {
        if (arr !== null) {
            return arr.reduce( function(prev, current, index){
                if(index === 0) return current.name;
                return prev + ", " + current.name;
            }, "")
        }
        else {
            return null;
        }
    }
    
    render() {      
        return (
        <div>
            <DrawerMenu />
            <AudioPlayer />
            <div className="container">
                <div className="row">
                    <div className="artist-details col-md-6 col-lg-4">
                        <h3> Now Playing: </h3>
                        {this.props.songs[this.props.currentIndex].title}
                        
                        <div className="search-artist">
                           <form onSubmit={(e)=>{ 
                                e.preventDefault(); 
                                this.props.submitSearch(this.props.input);
                                this.props.menuToggle(true);
                            }}>
                                <TextField hintText="e.g., Chainsmokers" 
                                    floatingLabelText="Enter Artist Name" 
                                    type="text" 
                                    onChange={this.props.inputSearch} 
                                    value={this.props.input} 
                                />
                                <IconButton type="submit" iconStyle={styles.smallIcon} style={styles.small} >
                                  <SearchButton />
                                </IconButton>
                            </form>   
                        </div>
                        
                     
                        <Card expanded={this.showCard(this.props.songs, this.props.currentIndex)}>
                            <CardMedia className="thumbnail" expandable={true}>
                                <img src={this.props.songs[this.props.currentIndex].image} alt={this.props.songs[this.props.currentIndex].title} />
                            </CardMedia>
                        </Card> 
                   </div>
               
                    <div className="song-container col-sm-12 col-md-6 col-lg-8">
                        <List className="song-list">
                            {this.props.songs.map( function(song, i) {
                                return <ListItem className="song-item" 
                                    key={i} 
                                    onClick={()=>{this.props.selectSong(i)}} 
                                    primaryText={song.title} 
                                    secondaryText={this.showArtists(song.artists)}
                                    leftAvatar={
                                          <Avatar
                                            color={cyan500} backgroundColor="transparent"
                                            style={{left: 8}}
                                          >
                                          {i+1}
                                          </Avatar>
                                    }   
                                    rightAvatar={<Avatar src={song.image}/>}
                                />
                            }, this)}
                        </List>
                    </div>
                </div>
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
        input: state.input,
        artists: state.artists
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        selectSong: selectSong,
        volumeChange: volumeChange, 
        addSong: addSong, 
        inputSearch: inputSearch, 
        submitSearch: submitSearch,
        menuToggle: menuToggle}, 
    dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);