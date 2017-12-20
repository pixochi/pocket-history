import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Linking,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

import CardMenu from './CardMenu';
import { copy, share } from './utils/cardMenuOptions';

import { COLORS } from '../constants/components';


class NewsCard extends PureComponent {

	static propTypes = {
	  description: PropTypes.string.isRequired,
	  img: PropTypes.string,
	  link: PropTypes.string.isRequired,
	  title: PropTypes.string.isRequired
	}

	_openArticle = (link) => {
		Linking.openURL(link);
	}

	render() {
		const { title, description, img, link } = this.props;
		const menuOptions = [
	  	copy({ content: `${title} - ${link}` }),
			share({ message: `${title} - ${link}` })
		]
		
	  return (
	  	<TouchableHighlight onPress={() => this._openArticle(link)}>
	  		<View>
		    	<View style={styles.cardContainer}>
				    <View style={styles.titleContainer}>
				    	<Text style={styles.title}>
				    	  { title }
				    	</Text>
				    </View>

			    	<Image
			    		source={{uri: img}}
			    	  style={styles.image} 
			    	/>	
		    	
				    <View style={styles.descriptionContainer}>
				    	<Text style={styles.description}>
				    	  { description }
				    	</Text>
				    	<View style={styles.menu}>
			  				<CardMenu options={menuOptions}/>
			    		</View>
				   	</View>
		    	</View>
		    </View>
		  </TouchableHighlight>
  	);
	}
}

const SCREEN_DIMENSIONS = Dimensions.get('screen');

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 4,
		marginHorizontal: 6,
		backgroundColor: COLORS.cardBackground,
		borderColor: COLORS.cardBorder,
		borderWidth: 1
	},
	titleContainer: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	title: {
		paddingHorizontal: 4,
		paddingVertical: 8,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: COLORS.greyLight
	},
	menu: {
		flex: .15,
	},
	descriptionContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 8
	},
	description: {
		flex: .85,
		paddingLeft: 14,
		fontSize: 17,	
		color: COLORS.greyDark
	},
	image: {
		height: SCREEN_DIMENSIONS.width * 0.6,
		width: SCREEN_DIMENSIONS.width * 0.9
	},
});


export default NewsCard;