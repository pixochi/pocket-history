import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Animated
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { HEADER_HEIGHT, COLORS } from '../constants/components';


class DateHeader extends PureComponent {

  static propTypes = {
    selectedDate: PropTypes.object.isRequired,
    changeDate: PropTypes.func.isRequired,
    headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    openModal: PropTypes.func.isRequired
  }

  render() {
    // headerStyle contains animated props
    const { selectedDate, changeDate, openModal, headerStyle } = this.props;
    const day = 1000*60*60*24 // miliseconds to 1 day

    return (
      <Animated.View style={[styles.header, headerStyle]}>
        <View style={styles.iconContainer}>
          <Icon 
            raised
            name='keyboard-arrow-left'
            color='#fff'
            underlayColor={COLORS.underlayColor}
            size={44}
            style={[styles.arrow, styles.arrowLeft]} 
            onPress={() => changeDate(selectedDate.timestamp - day)} 
          />
       </View>
       <View style={styles.dateContainer}>
          <Button
            title={selectedDate.factDate} 
            icon={{name: 'calendar', type: 'font-awesome'}}
            textStyle={styles.headerText} 
            backgroundColor={COLORS.dateHeader}
            onPress={openModal} 
          />
        </View>
        <View style={styles.iconContainer}>
          <Icon 
            name='keyboard-arrow-right'
            color='#fff'
            underlayColor={COLORS.underlayColor}
            size={44}
            style={styles.arrow}
            onPress={() => changeDate(selectedDate.timestamp + day)} 
          />
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
 header: {
    backgroundColor: COLORS.dateHeader,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000
  },
  dateContainer: {
    flex: 5
  },
  headerText: {
    fontSize: 25
  },
  iconContainer: {
   flex: 1
  },
  arrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
});


export default DateHeader;