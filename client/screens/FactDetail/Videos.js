import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  WebView,
} from 'react-native';
import { connect } from 'react-redux';

// COMPONENTS
import Loader from '../../components/Loader';
import VideoCard from '../../components/VideoCard';
import Modal from '../../components/Modal';
import NetworkProblem from '../../components/NetworkProblem';
import { copy, share, save } from '../../components/utils/cardMenuOptions';

// ACTIONS
import { fetchVideos } from './actions';
import { openModal } from '../../components/Modal/actions';

import gStyles from '../../styles';

const VIDEO_ROOT_URL = 'https://www.youtube.com/watch?v=';

class Videos extends Component {
  static defaultProps = {
    videos: [],
    isLoading: true,
    isOnline: false
  }
  state = { selectedVideoId: '' }

  componentDidMount() {
    const { screenProps, fetchVideos } = this.props;
    fetchVideos(screenProps.navigation.state.params.html);
  }

  _cardMenuOptions = ({id, title}) => {
    const { addFavorite, copyToClipboard } = this.props.screenProps;
    const videoUrl = VIDEO_ROOT_URL+id;
    const menuOptions = [
      copy({ onSelect: () => copyToClipboard(videoUrl) }),
      share({ message: videoUrl }),
      save({ onSelect: () => addFavorite({id, title}, 'videos') })
    ]
    return menuOptions;
  }


  _onVideoPress = (videoId) => {
    this.setState({ selectedVideoId: videoId }, () => {
      this.props.openModal('factVideo');
    });
  }

  _refetchVideos = () => {
    const { navigation, fetchVideos } = this.props;
    fetchVideos(navigation.state.params.html);
  }

  _renderVideos(videos) {
    return videos.map(video => (
      <VideoCard
        key={video.id}
        onVideoPress={this._onVideoPress}
        menuOptions={this._cardMenuOptions(video)}
        {...video}
      />
    ));
  }

  render() {
    const { videos, isLoading, isOnline } = this.props;
    const { selectedVideoId } = this.state;
    const videoUrl = VIDEO_ROOT_URL+selectedVideoId;

    if (isLoading) {
      return <Loader />;
    }

    if (!isOnline && videos.length === 0) {
      return <NetworkProblem solveConnection={this._refetchVideos} />
    }

    if (!videos || videos.length === 0) {
      return (
        <View style={gStyles.screenMiddle}>
          <Text style={styles.screenMessage}>
            No videos found.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView>
      	{ this._renderVideos(videos) }
        <Modal 
          isScrollable={false} 
          modalStyle={styles.modal} 
          name='factVideo'
        >
          <View style={gStyles.videoContainer}>
            <WebView
              startInLoadingState
              renderLoading={() => <Loader />}
              source={{uri: videoUrl}}
              style={gStyles.videoPlayer}
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: -8
  },
  screenMessage: {
    fontSize: 16
  }
});

const mapStateToProps = ({ factDetail: { videos, isLoading }, offline}) => (
  {
    videos,
    isLoading,
    isOnline: offline.online
  }
)

const mapDispatchToProps = (dispatch) => ({
  fetchVideos: (textQuery) => {
    dispatch(fetchVideos(textQuery));
  },
  openModal: (name) => {
    dispatch(openModal(name));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Videos);