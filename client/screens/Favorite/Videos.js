import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';

import { openModal } from '../../components/Modal/actions';

import Favorites from './Favorites';

import VideoCard from '../../components/VideoCard';
import VideoModal from './components/VideoModal';
import VideosLabel from '../../components/TabBarLabels/VideosLabel';
import { copy, share, remove } from '../../components/utils/cardMenuOptions';

import { VIDEO_ROOT_URL } from '../../constants/urls';


class FavoriteVideos extends PureComponent {
  static navigationOptions = {
    tabBarLabel: <VideosLabel />
  }

  state = { selectedVideoId: '' }

  _cardMenuOptions = ({id}) => {
    const { removeFavorite, copyToClipboard } = this.props.screenProps;
    const videoUrl = VIDEO_ROOT_URL+id;
    const menuOptions = [
      copy({ onSelect: () => copyToClipboard(videoUrl)}),
      share({ message: videoUrl }),
      remove({ onSelect: () => removeFavorite(id, 'videos') })
    ]
    return menuOptions;
  }

  _onVideoPress = (selectedVideoId) => {
    if (Platform.OS === 'android') {
      WebBrowser.openBrowserAsync(VIDEO_ROOT_URL+selectedVideoId);
    } else {
      this.setState({ selectedVideoId }, () => {
        this.props.openModal('favVideo');
      });
    }
  }

  _renderVideo = ({item}) => {
    return (
      <VideoCard
        onVideoPress={this._onVideoPress}
        menuOptions={this._cardMenuOptions(item)}
        {...item}
      />
    ) 
  }

  render() {
   const { videos } = this.props;
   const { selectedVideoId } = this.state;
   const videoUrl = VIDEO_ROOT_URL+selectedVideoId;

    return (
      <View style={{flex: 1}}>
        <Favorites
          data={videos}
          category='videos'
          renderFavorite={this._renderVideo}
        />
        <VideoModal 
          videoUrl={videoUrl}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

const mapStateToProps = ({ favorite }) => ({
  videos: favorite.videos
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (name) => {
    dispatch(openModal(name));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(FavoriteVideos);