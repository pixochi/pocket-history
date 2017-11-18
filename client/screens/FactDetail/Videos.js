import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  WebView,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

// COMPONENTS
import Loader from '../../components/Loader';
import VideoCard from '../../components/VideoCard';
import Modal from '../../components/Modal';
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
    fetchVideos(screenProps.navigation.state.params.text);
  }

  _cardMenuOptions = ({id, title}) => {
    const { addFavorite } = this.props.screenProps;
    const videoUrl = VIDEO_ROOT_URL+id;
    const menuOptions = [
      copy({ content: videoUrl }),
      share({ message: videoUrl }),
      save({ onSelect: () => addFavorite({id, title}, 'videos') })
    ]
    return menuOptions;
  }


  _onVideoPress = (videoId) => {
    this.setState({ selectedVideoId: videoId }, () => {
      this.props.openModal();
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
        menuOptions={this._cardMenuOptions(video)}
        {...video}
      />
    ));
  }

  render() {
    const { videos, isLoading, isOnline } = this.props;
    const { selectedVideoId } = this.state;
    const videoUrl = VIDEO_ROOT_URL+id;

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
        <Modal isScrollable={false} modalStyle={styles.modal} >
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
  openModal: () => {
    dispatch(openModal());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Videos);