import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  WebView,
} from 'react-native';
import { connect } from 'react-redux';

// COMPONENTS
import Header from './Header';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import NetworkProblem from '../../components/NetworkProblem';
import VideoCard from '../../components/VideoCard';
import VideosLabel from '../../components/TabBarLabels/VideosLabel';
import { copy, share, save } from '../../components/utils/cardMenuOptions';

// ACTIONS
import { fetchVideos } from './actions';
import { openModal } from '../../components/Modal/actions';

import gStyles from '../../styles';

const VIDEO_ROOT_URL = 'https://www.youtube.com/watch?v=';

class Videos extends PureComponent {
  static navigationOptions = {
    tabBarLabel : <VideosLabel />
  }
  
  static defaultProps = {
    videos: [],
    isLoading: true,
    isOnline: false
  }
  state = { selectedVideoId: '' }

  componentDidMount() {
    this._fetchVideos();
  }

  componentWillReceiveProps(nextProps) {
    const gotConnected = !this.props.isOnline && nextProps.isOnline;

    if (gotConnected) {
      this._fetchVideos();
    }
  }

  _fetchVideos = () => {
    const { screenProps, fetchVideos } = this.props;
    fetchVideos(screenProps.navigation.state.params.text);
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

  _renderVideo = ({item}) => (
    <VideoCard
      onVideoPress={this._onVideoPress}
      menuOptions={this._cardMenuOptions(item)}
      {...item}
    />
  )

  render() {
    const { videos, isLoading, isOnline, screenProps } = this.props;
    const { selectedVideoId } = this.state;
    const videoUrl = VIDEO_ROOT_URL+selectedVideoId;
    let Main;

    if (isLoading) {
      Main = <Loader />;
    } else if (!isOnline && videos.length === 0) {
      Main = <NetworkProblem />
    } else if (!videos.length) {
      Main = (
        <View style={gStyles.screenMiddle}>
          <Text style={styles.screenMessage}>
            No videos found.
          </Text>
        </View>
      );
    } else {
      Main = (
        <View>
          <FlatList 
            data={videos}
            extraData={videos}
            keyExtractor={video => video.id}
            renderItem={this._renderVideo}
            contentContainerStyle={styles.videosContainer}
          />
          <Modal
            name='factVideo'
            isScrollable={false}  
          >
            <View style={gStyles.videoContainer}>
              <WebView
                source={{uri: videoUrl}}
                startInLoadingState
                renderLoading={() => <Loader />}
                style={gStyles.videoPlayer}
              />
            </View>
          </Modal>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Header navigation={screenProps.navigation} />
        <View style={gStyles.screenBody}>
          { Main }
        </View>
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  videosContainer: {
    // marginBottom: 60
  },
  screenMessage: {
    fontSize: 16
  }
});

const mapStateToProps = ({ factDetail: { videos }, offline}) => {
  const { data, isLoading } = videos;
  return {
    videos: data,
    isLoading,
    isOnline: offline.online
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchVideos: (textQuery) => {
    dispatch(fetchVideos(textQuery));
  },
  openModal: (name) => {
    dispatch(openModal(name));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Videos);