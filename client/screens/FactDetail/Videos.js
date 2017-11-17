import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';
import { connect } from 'react-redux';

// COMPONENTS
import Loader from '../../components/Loader';
import VideoCard from '../../components/VideoCard';
import VideoModal from '../../components/VideoModal';

// ACTIONS
import { fetchVideos } from './actions';

import gStyles from '../../styles';


class Videos extends Component {
  static defaultProps = {
    videos: [],
    isLoading: true,
    isOnline: false
  }

  state = {
    isVideoModalVisible: false,
    selectedVideoId: ''
  }

  componentDidMount() {
    const { screenProps, fetchVideos } = this.props;
    fetchVideos(screenProps.navigation.state.params.text);
  }

  _closeVideoModal = () => {
    this.setState({ isVideoModalVisible: false });
  }

  _openVideoModal = () => {
    this.setState({ isVideoModalVisible: true });
  }

  _onVideoPress = (videoId) => {
    this.setState({ selectedVideoId: videoId }, () => {
      this._openVideoModal();
    });
  }

  _refetchVideos = () => {
    const { navigation, fetchVideos } = this.props;
    fetchVideos(navigation.state.params.text);
  }

  _renderVideos(videos) {
    return videos.map(video => (
      <VideoCard
        key={video.id}
        onVideoPress={this._onVideoPress}
        addToFavorite={this.props.screenProps.addToFavorite}
        {...video}
      />
    ));
  }

  render() {
    const { videos, isLoading, isOnline } = this.props;
    const { isVideoModalVisible, selectedVideoId } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    if (!isOnline && videos.length === 0) {
      return <NetworkProblem solveConnection={this._refetchVideos} />
    }

    if (videos.length === 0) {
      <View style={gStyles.screenMiddle}>
        <Text>
          No videos found.
        </Text>
      </View>
    }

    return (
      <ScrollView>
      	{ this._renderVideos(videos) }
        <VideoModal 
          videoId={selectedVideoId}
          isVisible={isVideoModalVisible}
          closeModal={this._closeVideoModal}
        />
      </ScrollView>
    );
  }
}

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
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Videos);