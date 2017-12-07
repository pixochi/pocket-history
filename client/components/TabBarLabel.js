import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';


class TabBarLabel extends PureComponent {
  render() {
  	const {
  		icon,
  		text,
  		textStyle
  	} = this.props;

  	const { name, type, color = '#fff', size = 22, iconStyle } = icon;
    return (
      <View style={styles.labelContainer}>
        {	
        	icon &&
        	<Icon 
		        name={name} 
		        type={type}
		        color={color} 
		        size={size}
		        style={iconStyle}
        	/>
      	}

      	{	
      		text &&
      		<Text style={textStyle}>
	        	{ text }
	      	</Text>
      	}
      </View>
    );
  }
}

TabBarLabel.propTypes = {
	icon: PropTypes.object,
	text: PropTypes.string,
	textStyle: PropTypes.object,
}

TabBarLabel.defaultProps = {
  textStyle: {
  	fontSize: 11,
  	color: '#fff'
  }
}

const styles = StyleSheet.create({
	labelContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	}
});


export default TabBarLabel;