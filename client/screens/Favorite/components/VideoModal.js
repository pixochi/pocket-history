import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  WebView
} from 'react-native';

import Loader from '../../../components/Loader';
import Modal from '../../../components/Modal';

import gStyles from '../../../styles';

class VideoModal extends PureComponent {
  render() {
  	const { videoUrl } = this.props;

    return (
    	<View>
	      <Modal 
	        isScrollable={false} 
	        modalStyle={styles.modal} 
	        name='favVideo'
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


export default VideoModal;