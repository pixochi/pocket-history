import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

class MyCheckBox extends PureComponent {

  render() {
  	const { title, checked, onPress } = this.props;

    return (
      <CheckBox
	      center
	      title={title}
	      iconRight
	      iconType='material-community'
	      checkedIcon='checkbox-marked-outline'
	      uncheckedIcon='checkbox-blank-outline'
	      checkedColor='#278c6f'
	      uncheckedColor='#495954'
	      checked={checked}
	      textStyle={{fontSize: 20}}
	      onPress={onPress}
	    />
    );
  }
}

const styles = StyleSheet.create({

});


export default MyCheckBox;