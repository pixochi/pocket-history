import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated
} from 'react-native';


class AnimatedHeader extends Component {
	// only visual stuff
  state = {
    scrollAnim: new Animated.Value(0),
    offsetAnim: new Animated.Value(0),
    isModalVisible: false
  };

  componentDidMount() {
     this.state.scrollAnim.addListener(this._handleScroll);
  }

  componentWillUnMount() {
     this.state.scrollAnim.removeListener(this._handleScroll);
  }

  _handleScroll = ({ value }) => {
    this._previousScrollvalue = this._currentScrollValue;
    this._currentScrollValue = value;
  };
  
  _handleScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._handleMomentumScrollEnd, 250);
  };

  _handleMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _showHeader = () => {   
    const previous = this._previousScrollvalue;
    const current = this._currentScrollValue;
    const currentDiff = previous - current;

    // date is already shown
    if (this.diff !== currentDiff && (previous <= current || current >= HEADER_HEIGHT) ) {
      Animated.timing(
        this.state.offsetAnim,
        {
          toValue: -this._currentScrollValue,
          duration: 0,
        }
      ).start();
      this.diff = previous - current;
    }  
  }
  
  _handleMomentumScrollEnd = () => {
    const previous = this._previousScrollvalue;
    const current = this._currentScrollValue;
    
    if (previous > current || current < HEADER_HEIGHT) {
      Animated.spring(this.state.offsetAnim, {
        toValue: -current,
        tension: 300,
        friction: 35,
      }).start();
    } else {
      Animated.timing(this.state.offsetAnim, {
        toValue: 0,
        duration: 300,
      }).start();
    }
  };

  translateY = Animated.add(this.state.scrollAnim, this.state.offsetAnim).interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp'
  });

  render() {
    return (
      <View headerStyle={{ transform: [{translateY}] }} >
      	<Text>
      	  HEADER TEXT
      	</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default AnimatedHeader;