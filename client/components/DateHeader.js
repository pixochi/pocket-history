import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Animated
} from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { HEADER_HEIGHT } from '../constants/components';


class DateHeader extends PureComponent {

  render() {
    const { headerStyle, selectedDate, changeDate, openModal } = this.props;
    const day = 1000*60*60*24 // miliseconds to 1 day

    return (
      <Animated.View style={[styles.header, headerStyle]}>
        <Icon 
          raised
          name='keyboard-arrow-left'
          color='#fff'
          underlayColor='#1d70b1'
          size={44}
          style={styles.arrow} 
          onPress={() => changeDate(selectedDate.timestamp - day)} 
        />
        <Button
          raised
          title={selectedDate.factDate} 
          textStyle={styles.headerText} 
          backgroundColor='#2196f3'
          onPress={openModal} 
        />
        <Icon 
          raised
          name='keyboard-arrow-right'
          color='#fff'
          underlayColor='#1d70b1'
          size={44}
          style={styles.arrow}
          onPress={() => changeDate(selectedDate.timestamp + day)} 
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
 header: {
    backgroundColor: '#2196f3',
    height: HEADER_HEIGHT,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000
  },
  headerText: {
    fontSize: 25
  },
  arrow: {
  	alignSelf: 'center'
  }
});


export default DateHeader;