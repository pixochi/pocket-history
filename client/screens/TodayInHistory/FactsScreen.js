import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated
} from 'react-native';
import _ from 'lodash';
import { Button } from 'react-native-elements';

// COMPONENTS
import Loader from '../../components/Loader';
import FactCard from '../../components/FactCard';

import { HEADER_HEIGHT } from '../../constants/components';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FactsScreen extends Component {
	getItemLayout = (data, index) => (
    {length: 80, offset: 80 * index, index}
  );

  _refetchFacts = () => {
  	const { canFetch, fetchFacts, selectedDate } = this.props;

  	if (canFetch) {
  		fetchFacts(selectedDate.timestamp);
  	}
  }

  _renderFact = ({ item }) => <FactCard {...item} />

  render() {
	  const { selectedFacts, renderFact, category, isReady, onScroll,
	  	 onMomentumScrollBegin, onMomentumScrollEnd, onScrollEndDrag } = this.props;

	  // no facts after a try to rehydrate
	  // or fetch the facts from API
	  if(isReady && _.isEmpty(selectedFacts)){
	    return (
	      <View style={styles.screenMiddle}>
	        <Text>
	          Check your internet connection and try again.
	        </Text>
	        <Button title='Try again' onPress={this._refetchFacts} />
	      </View>
	    )
	  }

	  return (
	    <View style={{flex: 1}}>
	      <Loader animating={!isReady} />
	      { _.has(selectedFacts, category) &&
	        <AnimatedFlatList
	         	contentContainerStyle={styles.list}
	          data = {selectedFacts[category]}
	          extraData = {selectedFacts[category]}
	          keyExtractor = {(fact) => fact.text}
	          renderItem = {this._renderFact}
	          scrollEventThrottle={16}
	          onScroll={onScroll}
	          onMomentumScrollBegin={onMomentumScrollBegin}
	          onMomentumScrollEnd={onMomentumScrollEnd}
	          onScrollEndDrag={onScrollEndDrag}
	          getItemLayout={this.getItemLayout}
	          initialNumToRender={10}
	        />
      	}
    	</View>
  	)
  }
}

const styles = StyleSheet.create({
  screenMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  list: {
  	padding: 4,
  	paddingTop: HEADER_HEIGHT
  }
});


export default FactsScreen;