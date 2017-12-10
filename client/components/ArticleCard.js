import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  Share,
  Clipboard,
  TouchableHighlight
} from 'react-native';

import CardMenu from './CardMenu';
import { fixWikiLink } from '../utils/link';
import { COLORS } from '../constants/components';
import gStyles from '../styles';


class ArticleCard extends PureComponent {
	static propTypes = {
	  link: PropTypes.string.isRequired,
	  title: PropTypes.string.isRequired,
	  menuOptions: PropTypes.array.isRequired
	}

	_openArticle = (link) => {
		Linking.openURL(fixWikiLink(link));
	}

	render() {
		const { link, title, menuOptions } = this.props;

		return (
	  	<View style={styles.articleCard}>
	  		
				<TouchableHighlight 
					style={styles.titleContainer}
					underlayColor='#aaa'
					onPress={() => this._openArticle(link)}
				>
						<Text style={styles.title}>
						  { title }
						</Text>
				</TouchableHighlight>

				<View style={styles.menu}>
					<CardMenu options={menuOptions}/>
				</View>

			</View>
	  );
	}
}

const styles = StyleSheet.create({
	articleCard: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 5,
		borderColor: COLORS.cardBorder,
		borderBottomWidth: 1,
		backgroundColor: COLORS.cardBackground
	},
	titleContainer: {
		flex: .95,
		paddingVertical: 15
	},
	title: {
		paddingHorizontal: 15,
		fontSize: 20,
		fontWeight: 'bold',
		color: COLORS.link
	},
	menu: {
		marginRight: 10
	},
});


export default ArticleCard;