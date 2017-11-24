import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default StyleSheet.create({
	container: {
		margin: 10,
    padding: 15
	},
  screenMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    marginTop: 0
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.3)'
  },
  cardMenu: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1000,
    padding: 4,
    backgroundColor:'rgba(255,255,255,1)'
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  videoPlayer: {
    flex: 1,
    height: SCREEN_HEIGHT - 80
  },
  filterContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  screenBody: {
    flex: 1,
    marginTop: 70
  }
});