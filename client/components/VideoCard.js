import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import Image from 'react-native-scalable-image';

import CardMenu from './CardMenu';
import gStyles from '../styles';
import { COLORS } from '../constants/components';


const DEVICE_WIDTH = Dimensions.get('screen').width;
const IMG_ROOT_URL = 'https://i.ytimg.com/vi';
const IMG_SIZE = 'mqdefault.jpg' // medium, 320*180

class VideoCard extends PureComponent {

  render() {
  	const { id, title, onVideoPress, menuOptions } = this.props;
  	const imgUri = `${IMG_ROOT_URL}/${id}/${IMG_SIZE}`;

    return (
      <View
      	onPress={() => null}
      	style={styles.videoCardContainer}
      >
      
	      <TouchableOpacity 
	    		style={styles.imgContainer}
	    		activeOpacity={0.8}
	    		onPress={() => onVideoPress(id)}
	    	>
	      	<Image
	      		source={{uri: imgUri}}
	      		width={DEVICE_WIDTH}
	      	/>
		      <View style={[gStyles.overlay, styles.iconContainer]}>
	      		<Icon
	      			reverse
		      		name='play'
		      		type='font-awesome'
		      		size={28}
		      		color='#ff0000'
		      		iconStyle={styles.playIcon}
		      	/>
	      	</View>
		    </TouchableOpacity>

	      <View style={styles.titleContainer}>
	      	<Text style={styles.title}>
      	  	{ title }
      		</Text>
      		<View style={styles.menu}>
    	  		<CardMenu options={menuOptions}/>
    			</View>
	      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	videoCardContainer: {
		flex: 1,
		marginVertical: 5,
		backgroundColor: COLORS.cardBackground,
		borderColor: COLORS.cardBorder,
		borderTopWidth: 1,
		borderBottomWidth: 1
	},
	imgContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	playIcon: {
		paddingLeft: 6
	},
	titleContainer: {
		flex: 1,
		flexDirection: 'row',
		paddingVertical: 7
	},
	title: {
		flex: 0.85,
		paddingLeft: 15,
		fontSize: 20,
		fontWeight: 'bold',
		color: COLORS.greyDark
	},
	menu: {
		flex: .15
	}
});


export default VideoCard;