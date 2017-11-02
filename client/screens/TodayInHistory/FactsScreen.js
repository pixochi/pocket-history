import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated
} from 'react-native';
import _ from 'lodash';

// COMPONENTS
import Loader from '../../components/Loader';

import { HEADER_HEIGHT } from '../../constants/components';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FactsScreen extends Component {
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
          renderItem = {renderFact}
          scrollEventThrottle={16}
          onScroll={onScroll}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          getItemLayout={(data, index) => (
            {length: 80, offset: 80 * index, index}
          )}
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