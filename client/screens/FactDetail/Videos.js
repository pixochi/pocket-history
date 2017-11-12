import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';

// ACTIONS
import { fetchVideos } from './actions';


class Videos extends Component {

  componentDidMount() {
    const { navigation, fetchVideos } = this.props;
    fetchVideos(navigation.state.params.text);
  }

  _renderVideos(videos) {
    return videos.map(video => (
      <Text key={video.id}>
        { video.id }
      </Text>
    ));
  }

  render() {
    return (
      <View>
      	{ this._renderVideos(this.props.videos) }
      </View>
    );
  }
}

const styles = StyleSheet.create({

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
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Videos);