import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated,
  Clipboard,
  Share
} from 'react-native';
import _ from 'lodash';
import hash from 'string-hash';

// COMPONENTS
import Loader from '../../components/Loader';
import FactCard from '../../components/FactCard';
import NetworkProblem from '../../components/NetworkProblem';

import { copy, share, save } from '../../components/utils/cardMenuOptions';

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

  _addFactToFavorite = (fact) => {
    const { addFavorite, selectedDate } = this.props;
    const id = hash(fact.text+fact.year);
    let favoriteFact = _.omit(fact, ['links']);
    favoriteFact = { ...fact, date: selectedDate.factDate, id }
    addFavorite(favoriteFact, 'facts');
  }

  _cardMenuOptions = (item) => {
    return [
      copy({ content: item.text }),
      share({ message: item.text }),
      save({ onSelect: () => this._addFactToFavorite(item) })
    ]
  }

  _renderFact = ({ item }) => {
  	const { navigation } = this.props;
  	return (
  		<FactCard 
		  	{...item}
		  	isFavorite={false}
		  	navigation={navigation}
		  	menuOptions={this._cardMenuOptions(item)}
	  	/>
  	);
  }

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
		flex: 1
	},
  list: {
  	padding: 4,
  	paddingTop: HEADER_HEIGHT
  }
});


export default FactsScreen;