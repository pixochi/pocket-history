import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

import Loader from './Loader';


const VIDEO_ROOT_URL = 'https://www.youtube.com/watch?v=';

const VideoModal = (props) => {
	const { isVisible, closeModal, videoId } = props;
	const videoUrl = `${VIDEO_ROOT_URL}${videoId}`;

  return (
	  <Modal 
      isVisible={isVisible} 
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      style={styles.modal}
    >	
	    <View style={styles.videoContainer}>
	    	<WebView
	    		startInLoadingState
	    		renderLoading={() => <Loader />}
	        source={{uri: videoUrl}}
	        style={styles.videoPlayer}
	      />
	    	<Button 
	    		title='Close'
	    		onPress={closeModal}
	    		buttonStyle={styles.closeBtn}
	    		textStyle={styles.closeBtnText}
	    	/>
	    </View>
    </Modal>
  );

}

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const CLOSE_BTN_HEIGHT = 40;

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		margin: -8
	},
	videoContainer: {
		flex: 1,
		backgroundColor: '#fff'
	},
	videoPlayer: {
		flex: 1,
		height: SCREEN_HEIGHT - CLOSE_BTN_HEIGHT - 40
	},
	closeBtn: {
		height: CLOSE_BTN_HEIGHT,
		margin: 10,
		backgroundColor: 'rgb(255, 87, 35)'
	},
	closeBtnText: {
		padding: 5,
		fontSize: 24
	}
});


export default VideoModal;