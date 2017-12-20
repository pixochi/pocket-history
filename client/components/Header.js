import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { Constants } from 'expo';
import { Header } from 'react-native-elements';

import { COLORS } from '../constants/components';


class AppHeader extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
    centerComponent: PropTypes.element,
    centerComponentStyle: PropTypes.object,
    leftComponent: PropTypes.element,
    leftComponentStyle: PropTypes.object,
    rightComponent: PropTypes.element,
    rightComponentStyle: PropTypes.object
  }

  _renderTitle = () => {
    const { title } = this.props;
    return (
      <Text style={styles.title}>
        { title }
      </Text>
    )  
  }

  render() {
  	const { rightComponent, centerComponent, leftComponent, title } = this.props;
    const _centerComponent = title ? this._renderTitle() : centerComponent;
    const {
      leftComponentStyle = styles.leftComponent,
      centerComponentStyle = styles.centerComponent,
      rightComponentStyle = styles.rightComponent,
    } = this.props;

    return (
      <Header
        outerContainerStyles={styles.outerHeaderStyles}
        innerContainerStyles={styles.innerHeaderStyles}
        backgroundColor={COLORS.header}
      >
      
        <View style={styles.headerItemsContainer}>
          <View style={leftComponentStyle}>{leftComponent}</View>
          <View style={centerComponentStyle}>{_centerComponent}</View>
          <View style={rightComponentStyle}>{rightComponent}</View>
        </View>
        
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  outerHeaderStyles: {
    zIndex:10000,
    borderBottomWidth: 0,
    alignItems: 'center',
    paddingTop: 0
  },
  innerHeaderStyles: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  headerItemsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight
  },
  centerComponent: {
    flex: 5,
    padding: 4
  },
	title: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 5,
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
    ...Platform.select({
      ios: {
        fontFamily: 'AmericanTypewriter-Condensed'
      },
      android: {
        fontFamily: 'Roboto'
      }
    })
	},
  leftComponent: {
    flex: 1,
    alignContent: 'center'
    // alignSelf: 'center'
  },
  rightComponent: {
    flex:1,
    alignContent: 'center'
  }
});


export default AppHeader;