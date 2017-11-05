import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Picker
} from 'react-native';
import HTMLView from 'react-native-htmlview';

class FactCard extends PureComponent {

  render() {
    const { year, html } = this.props;
    const currentYear = new Date().getFullYear();

    return (
      <View style={styles.factCard}>

        <View style={styles.yearHeader}>
          <Text style={styles.year}>
            { year }
          </Text>
          <View style={{marginLeft: 15}}>
            <Text>
              { currentYear - year } years ago
            </Text>
          </View>
        </View>
          
        <HTMLView 
          value={html}
          RootComponent={Text}
          style={styles.factText}
        />
        <Picker
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  factCard: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#B351E1',
    borderRadius: 3,
    margin: 4,
    padding: 4
  },
  yearHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  year: {
    fontSize: 21,
    
  },
  factText: {
    
  }
});


export default FactCard;
