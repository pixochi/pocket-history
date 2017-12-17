import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { COLORS } from '../constants/components';

class CalendarModal extends PureComponent {

  static propTypes = {
    currentDate: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    changeDate: PropTypes.func.isRequired
  }

  _onDateChange = (day) => {
    this.props.changeDate(day.timestamp);
    this.props.closeModal();
  }

  // @param direction ['left', 'right']
  _renderArrow = (direction) => {
    const iconName = 'md-arrow-drop' + direction;
    return (
      <Icon 
        name={iconName}
        type='ionicon'
        color={COLORS.greyDark}
        size={35}
      />
    )
  }

  render() {
    const { currentDate, closeModal, isVisible } = this.props;
    let markedDate = {};
    markedDate[currentDate] = {selected: true, marked: true};

    return (
      <View style={styles.modalContainer}>
        <Modal 
          isVisible={isVisible} 
          onBackdropPress={closeModal}
          onBackButtonPress={closeModal}
        >
        <ScrollView style={styles.contentContainer}>
          <Calendar
            current={currentDate}
            markedDates={markedDate}
            monthFormat={'MMMM'}
            firstDay={1}
            renderArrow={this._renderArrow}
            onDayPress={(day) => this._onDateChange(day)}
            theme={calendarTheme}
            style={styles.calendar}
          />
          <Button 
            title='Cancel' 
            onPress={closeModal} 
            buttonStyle={styles.cancelBtn} 
            textStyle={styles.cancelBtnText}
          />
        </ScrollView>
        </Modal>
      </View>  
    );
  }

}

const calendarTheme = {
  textMonthFontSize: 20,
  selectedDayBackgroundColor: COLORS.yellowDark,
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'red'
  },
  contentContainer: {
    flex: 1,
  },
  calendar: {
    flex: 1
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#db4437',
  },
  cancelBtnText: {
    fontSize: 18
  }
});


export default CalendarModal;