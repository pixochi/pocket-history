import React, { PureComponent } from 'react';
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
import { COLORS } from '../constants/components';


const IMG_ROOT_URL = 'https://i.ytimg.com/vi';
const IMG_SIZE = 'mqdefault.jpg' // medium, 320*180

class VideoCard extends PureComponent {

  render() {
  	const { id, title, onVideoPress, menuOptions } = this.props;
  	const imgUri = `${IMG_ROOT_URL}/${id}/${IMG_SIZE}`;
  	const videoUrl = 'https://www.youtube.com/watch?v='+id;

    return (
      <View
      	onPress={() => null}
      	style={styles.videoCardContainer}
      >
      
	      <TouchableOpacity 
	    		style={styles.imgContainer}
	    		activeOpacity={0.7}
	    		onPress={() => onVideoPress(id)}
	    	>
		      <View>
		      	<Image
		      	  style={styles.image}
		      	  source={{uri: imgUri}}
		      	/>
		      </View>
		      <View style={[gStyles.overlay, styles.iconContainer]}>
		      		<Icon
		      			reverse
			      		name='play'
			      		type='font-awesome'
			      		size={30}
			      		color='#ff0000'
			      		iconStyle={{paddingLeft: 8}}
			      	/>
	      	</View>
		    </TouchableOpacity>

	      <View style={styles.titleContainer}>
	      	<Text style={styles.title}>
      	  	{ title }
      		</Text>
	      </View>

    	  <View style={[gStyles.cardMenu, styles.menu]}>
    	  	<CardMenu options={menuOptions}/>
    		</View>

      </View>
    );
  }
}

const IMG_WIDTH = 320;
const IMG_HEIGHT =  180;

const borderBottomRadius = {
	borderBottomRightRadius: 10,
	borderBottomLeftRadius: 10
}

const borderTopRadius = {
	borderTopRightRadius: 15,
	borderTopLeftRadius: 15
}

const styles = StyleSheet.create({
	videoCardContainer: {
		flex: 1,
		marginHorizontal: 15,
		marginVertical: 10,
		backgroundColor: '#fff',
		borderColor: '#fff',
		borderWidth: 6,
		borderRadius: 10
	},
	titleContainer: {
		flex: 1,
		backgroundColor: COLORS.yellowLight,
		// ...borderBottomRadius
	},
	title: {
		padding: 10,
		textAlign: 'center',
		fontSize: 22,
		fontWeight: 'bold',
		color: '#fff'
	},
	imgContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		// ...borderTopRadius
	},
	image:{
		height: IMG_HEIGHT,
		width: IMG_WIDTH,
		// ...borderTopRadius
	},
	iconContainer: {
		backgroundColor: 'rgba(0,0,0,.25)',
		// ...borderTopRadius
	},
	menu: {
		padding: 8,
		backgroundColor: '#222',
		// borderTopRightRadius: 10
	}
});


export default VideoCard;