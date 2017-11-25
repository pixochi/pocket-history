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
import MenuIcon from '../../components/MenuIcon';
import NetworkProblem from '../../components/NetworkProblem';

import { copy, share, save } from '../../components/utils/cardMenuOptions';

import { HEADER_HEIGHT } from '../../constants/components';

import gStyles from '../../styles';


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
    const id = hash(fact.html+fact.year);
    let favoriteFact = _.omit(fact, ['links']);
    favoriteFact = { ...favoriteFact, date: selectedDate.factDate, id }
    addFavorite(favoriteFact, 'facts');
  }

  _cardMenuOptions = (item) => {
  	const { copyToClipboard } = this.props;
    return [
      copy({ onSelect: () => copyToClipboard(item.text)}),
      share({ message: item.text }),
      save({ onSelect: () => this._addFactToFavorite(item) })
    ]
  }

  _renderFact = ({ item }) => {
  	const { navigation, category } = this.props;
  	return (
  		<FactCard 
		  	{...item}
		  	category={category}
		  	isFavorite={false}
		  	navigation={navigation}
		  	menuOptions={this._cardMenuOptions(item)}
	  	/>
  	);
  }

  render() {
	  const { allFacts, filteredFacts, filter, renderFact, category, isReady, onScroll,
	  	 onMomentumScrollBegin, onMomentumScrollEnd, onScrollEndDrag } = this.props;
	  // no facts after a try to rehydrate
	  // or fetch the facts from API
	  if(isReady && _.isEmpty(allFacts)){
	    return <NetworkProblem solveConnection={this._refetchFacts} />
	  }

	  if (this.state.fakeLoading) {
	  	return <View />
	  }

	  if (_.has(filteredFacts, category) && !filteredFacts[category].length) {
	  	return (
	  		<View style={gStyles.screenMiddle}>		
	  			<Text>Your search - { filter.search }  - did not match any { category }.</Text>
	  		</View>
	  	)
	  }

	  return (
	    <View style={styles.listContainer}>
	      <Loader animating={!isReady} />
	      { _.has(filteredFacts, category) &&
	        <AnimatedFlatList
	         	contentContainerStyle={styles.list}
	          data = {filteredFacts[category]}
	          extraData = {filteredFacts[category]}
	          keyExtractor = {(fact) => fact.html}
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