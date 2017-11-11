import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements';


const CalendarModal = (props) => {

  _onDateChange = (day) => {
    props.changeDate(day.timestamp);
    props.closeModal();
  }

  const { currentDate, closeModal, isVisible } = props;
  let markedDate = {};
  markedDate[currentDate] = {selected: true, marked: true};

  return (
    <View style={{backgroundColor: 'white'}}>
      <Modal 
        isVisible={isVisible} 
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
      >
      <View style={{flex: 1}}>
        <Calendar
          style={{flex: 0.75}}
          current={currentDate}
          markedDates={markedDate}
          onDayPress={(day) => this._onDateChange(day)}
          monthFormat={'MMMM yyyy'}
          firstDay={1}
        />
        <Button 
          title='Cancel' 
          onPress={closeModal} 
          buttonStyle={styles.cancelBtn} 
          textStyle={styles.cancelBtnText}
        />
      </View>
      </Modal>
    </View>  
  );
}

const styles = StyleSheet.create({
  cancelBtn: {
    backgroundColor: 'rgb(255, 87, 35)'
  },
  cancelBtnText: {
    fontSize: 18
  }
});


export default CalendarModal;