import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView
} from 'react-native';
import { connect } from 'react-redux';

import { openModal } from '../../components/Modal/actions';

import Favorites from './Favorites';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import VideoCard from '../../components/VideoCard';
import { copy, share, remove } from '../../components/utils/cardMenuOptions';

import gStyles from '../../styles';


const VIDEO_ROOT_URL = 'https://www.youtube.com/watch?v=';

class FavoriteVideos extends Component {
  state = { selectedVideoId: '' }

  _cardMenuOptions = ({id}) => {
    const { removeFavorite } = this.props.screenProps;
    const videoUrl = VIDEO_ROOT_URL+id;
    const menuOptions = [
      copy({ content: videoUrl }),
      share({ message: videoUrl }),
      remove({ onSelect: () => removeFavorite(id, 'videos') })
    ]
    return menuOptions;
  }

  _onVideoPress = (selectedVideoId) => {
    this.setState({ selectedVideoId }, () => {
      this.props.openModal();
    });
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
        <Modal isScrollable={false} modalStyle={styles.modal}>
          <View style={gStyles.videoContainer}>
            <WebView
              startInLoadingState
              renderLoading={() => <Loader />}
              source={{uri: videoUrl}}
              style={gStyles.videoPlayer}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: -8
  }
});

const mapStateToProps = ({ favorite }) => ({
  videos: favorite.videos
});

const mapDispatchToProps = (dispatch) => ({
  openModal: () => {
    dispatch(openModal());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(FavoriteVideos);