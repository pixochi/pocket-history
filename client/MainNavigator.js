// REACT
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { DrawerNavigator} from 'react-navigation';
import { Constants } from 'expo';

import { routesDrawer, DrawerContent } from './navigation/mainDrawer';
import { initInterstitial } from './components/AdMob/actions';


class MainNavigator extends PureComponent {

  componentDidMount() {
    const { initiated, initInterstitial } = this.props;
    if (!initiated) {
      initInterstitial();
    }
  }

  render() {
  	const MainNavigator = DrawerNavigator(routesDrawer, {
      contentComponent: DrawerContent,
      drawerWidth: 320,
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
    });

    return (
      <View style={styles.appContainer}>
        <MainNavigator />
      </View>
    ) 
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  }
})

mapStateToProps = ({ adMob }) => ({
  initiated: adMob.initiated
});

const mapDispatchToProps = (dispatch) => ({
  initInterstitial: () => {
    dispatch(initInterstitial());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
