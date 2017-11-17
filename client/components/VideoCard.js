import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  Clipboard
} from 'react-native';
import { Icon } from 'react-native-elements';

import CardMenu from './CardMenu';

import gStyles from '../styles';


const IMG_ROOT_URL = 'https://i.ytimg.com/vi';
const IMG_SIZE = 'mqdefault.jpg' // medium, 320*180

class VideoCard extends Component {

  render() {
  	const { id, title, onVideoPress, addToFavorite } = this.props;
  	const imgUri = `${IMG_ROOT_URL}/${id}/${IMG_SIZE}`;
  	const videoUrl = 'https://www.youtube.com/watch?v='+id;
  	const menuOptions = [
			{
	      onSelect: () => Share.share({ title: 'Pocket History', message: videoUrl }),
	      iconProps: { name: 'share' },
	      optionText: 'Share'
	    },
	    {
	      onSelect: () => addToFavorite({id, title}, 'videos'),
	      iconProps: { name: 'star' },
	      optionText: 'Save'
	    },
	    {
	      onSelect: () => Clipboard.setString(videoUrl),
	      iconProps: { name: 'clipboard', type: 'font-awesome' },
	      optionText: 'Copy Link'
	    }
		]

    return (
      <View
      	onPress={() => null}
      	style={styles.videoCardContainer}
      >
      
	      <TouchableOpacity 
	    		style={styles.imgContainer}
	    		onPress={() => onVideoPress(id)}
	    	>
		      <View>
		      	<Image
		      	  style={styles.image}
		      	  source={{uri: imgUri}}
		      	/>
		      </View>
		      <View style={[gStyles.overlay, styles.icon]}>
		      	<Icon 
		      		name='youtube-play'
		      		type='font-awesome'
		      		size={70}
		      		color='#ff0000'
		      	/>
	      	</View>
		    </TouchableOpacity>

	      <View style={styles.titleContainer}>
	      	<Text style={styles.title}>
      	  	{ title }
      		</Text>
	      </View>

    	  <View style={styles.menu}>
    			<CardMenu options={menuOptions} />
    		</View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
	videoCardContainer: {
		flex: 1,
		margin: 20,
		backgroundColor: '#fff',
		borderColor: '#ddd',
		borderWidth: 1
	},
	titleContainer: {
		backgroundColor: '#B351E1'
	},
	title: {
		padding: 10,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff'
	},
	menu: {
		position: 'absolute',
		right: 0,
		top: 0,
		zIndex: 1000,
		padding: 4,
		backgroundColor:'#fff'
	},
	imgContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 190,
	},
	image:{
		height: 180,
		width: 320
	},
	icon: {
		backgroundColor: 'rgba(0,0,0,.2)'
	}
});


export default VideoCard;