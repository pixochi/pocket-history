import React, { PureComponent } from 'react';
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

const IMAGES_ON_LOAD = 3;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FactsScreen extends PureComponent {

	// used to make the screen change faster
	// first empty View is rendered instead of FlatList
	state = { fakeLoading: true }

	componentWillReceiveProps(nextProps) {
		const { selectedDate, filteredFacts, category } = this.props;
		const { fakeLoading } = this.state;
		const dateChanged = (selectedDate.factDate !== nextProps.selectedDate.factDate);
	  if (!fakeLoading && dateChanged) {
	  	this.setState({ fakeLoading: true });
	  }

	  const prevFactText = _.get(filteredFacts, `[${category}][0].text`, '');
	  const nextFactText =  _.get(nextProps.filteredFacts, `[${category}][0].text`, '');

	  if (fakeLoading && prevFactText === nextFactText) {
			this.setState({ fakeLoading: false });
	  }
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

  _isImgShown = (factIndex, img) => {

  	if (!img) { return false; }

  	const { category, itemsScrolled } = this.props;
  	const currentScroll = itemsScrolled[category] || 0;

  	return (factIndex < (currentScroll + IMAGES_ON_LOAD));
  }
  

  _renderFact = (fact) => {
  	const { item, index } = fact;
  	const { navigation, category } = this.props;

  	return (
  		<FactCard
		  	{...item}
		  	isImgShown={this._isImgShown(index, item.img)}
		  	category={category}
		  	isFavorite={false}
		  	navigation={navigation}
		  	menuOptions={this._cardMenuOptions(item)}
	  	/>
  	);
  }

  render() {
	  const { allFacts, filteredFacts, selectedDate, filter,
	   renderFact, category, isReady,onMomentumScrollBegin, 
	   onMomentumScrollEnd, onScroll, onScrollEndDrag } = this.props;
	   
	  let Main;



	  // no facts after a try to rehydrate
	  // or fetch the facts from API
	  if (this.state.fakeLoading) {

	  	Main = <View />;

	  }	else if(isReady && _.isEmpty(allFacts[selectedDate.factDate])){

	    Main = <NetworkProblem solveConnection={this._refetchFacts} />;

	  } else if (_.has(filteredFacts, category) && !filteredFacts[category].length) {

	  	Main = (
	  		<View style={gStyles.screenMiddle}>		
	  			<Text>Your search - { filter.search }  - did not match any { category }.</Text>
	  		</View>
	  	)

	  } else {
	  	Main = (
	  		<View style={styles.listContainer}>
	  			<Loader animating={!isReady} />
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
		        initialNumToRender={6}
		      />
        </View>
  		)
	  }

    return (
    	<View style={{flex:1}}>
    		{ Main }
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