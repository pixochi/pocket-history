import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';
import { WebBrowser } from 'expo';

import Header from '../../components/Header';
import MenuIcon from '../../components/MenuIcon';
import gStyles from '../../styles';
import { COLORS } from '../../constants/components';

const WIKI_URL = 'https://en.wikipedia.org/wiki/Main_Page';
const WIKI_COMMONS_URL = 'https://commons.wikimedia.org/wiki/Main_Page';
const MUFFIN_LABS_URL = 'http://muffinlabs.com/';
const LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/3.0/us/legalcode';

class About extends PureComponent {

	_openLink = (url) => {
		if (url) {
			WebBrowser.openBrowserAsync(url);
		}
	}

  render() {
  	const { navigation } = this.props;
    return (
      <View style={styles.container}>
      	<Header 
      		title='About'
      		leftComponent={<MenuIcon navigation={navigation}/>}
      	/>
      	<View style={gStyles.screenBody}>
	      	<View style={styles.attribution}>
	      		<Text style={styles.attributionText}>
	      		  This app uses data from{' '}
	      		  <Text 
	      		  	onPress={() => this._openLink(WIKI_URL)}
	      		  	style={styles.link}
	      		  >
	      		  	Wikipedia
	      		  </Text>
	      		  ,{' '}
	      		  <Text 
	      		  	onPress={() => this._openLink(WIKI_COMMONS_URL)}
	      		  	style={styles.link}
	      		  >
	      		  	 Wikimedia Commons{' '}
	      		  </Text>
	      		    and{' '}
	      		  <Text 
	      		  	onPress={() => this._openLink(MUFFIN_LABS_URL)}
	      		  	style={styles.link}
	      		  >
	      		  	MuffinLabs{' '}
	      		  </Text>
	      		  licensed using{' '}
	      		  <Text 
	      		  	onPress={() => this._openLink(LICENSE_URL)}
	      		  	style={styles.link}
	      		  >
	      		  	CC BY-SA 3.0
	      		  </Text>
	      		  {'.'}
	      		</Text>
	      	</View>
      	</View>
      </View>
    );
  }
}

About.navigationOptions = ({navigation}) => ({
  header: null,
  drawerLabel: 'About',
  drawerIcon: ({tintColor}) => (
    <Icon 
      name='info' 
      type='font-awesome' 
      color={tintColor} 
      size={26} 
    />
  )
});

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	attribution: {
		flex: 1,
		backgroundColor: COLORS.cardBackground,
		borderColor: COLORS.cardBorder,
		borderWidth: 1
	},
	attributionText: {
		padding: 10,
		color: COLORS.greyDark,
		fontSize: 18,
	},
	link: {
		color: COLORS.link,
		fontSize: 20,
	}
});


export default About;