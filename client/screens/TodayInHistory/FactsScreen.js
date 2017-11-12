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
import FactCard from '../../components/FactCard';
import NetworkProblem from '../../components/NetworkProblem';

import { HEADER_HEIGHT } from '../../constants/components';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FactsScreen extends Component {

	// used to make the screen change faster
	// first empty View is rendered instead of FlatList
	state = { fakeLoading: false }

	componentWillReceiveProps(nextProps) {
		const { selectedDate } = this.props;
		const dateChanged = (selectedDate.factDate !== nextProps.selectedDate.factDate);
	  if (!this.state.fakeLoading && dateChanged) this.setState({ fakeLoading: true });
	}

	componentDidUpdate() {
		if (this.state.fakeLoading) this.setState({ fakeLoading: false });
	}

  _refetchFacts = () => {
  	const { canFetch, fetchFacts, selectedDate } = this.props;

  	if (canFetch) {
  		fetchFacts(selectedDate.timestamp);
  	}
  }

  _renderFact = ({ item }) => <FactCard {...item} navigation={this.props.navigation} />

  render() {
	  const { selectedFacts, renderFact, category, isReady, onScroll,
	  	 onMomentumScrollBegin, onMomentumScrollEnd, onScrollEndDrag } = this.props;

	  // no facts after a try to rehydrate
	  // or fetch the facts from API
	  if(isReady && _.isEmpty(selectedFacts)){
	    return <NetworkProblem solveConnection={this._refetchFacts} />
	  }

	  if (this.state.fakeLoading) {
	  	return <View />
	  }

	  return (
	    <View style={styles.listContainer}>
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
	          initialNumToRender={8}
	        />
      	}
    	</View>
  	)
  }
}

const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		marginBottom: 15
	},
  list: {
  	padding: 4,
  	paddingTop: HEADER_HEIGHT
  }
});


export default FactsScreen;