import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

// COMPONENTS
import Banner from '../../components/AdMob';
import Loader from '../../components/Loader';
import FactCard from '../../components/FactCard';
import NetworkProblem from '../../components/NetworkProblem';

import { showInterstitial } from '../../components/AdMob/actions';

import { HEADER_HEIGHT } from '../../constants/components';
import gStyles from '../../styles';

const IMAGES_ON_LOAD = 3;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class FactsScreen extends PureComponent {

  componentDidUpdate(prevProps, prevState) {
    const { adMobCounter, showInterstitial } = this.props;
    if (adMobCounter === 5) {
      showInterstitial('factsCounter');
    } 
  }

  _refetchFacts = () => {
  	const { canFetch, fetchFacts, selectedDate } = this.props;
  	if (canFetch) {
  		fetchFacts(selectedDate.timestamp);
  	}
  }

  _isImgShown = (factIndex, img) => {
  	if (!img) { return false; }
  	const { category, itemsScrolled } = this.props;
  	const currentScroll = itemsScrolled[category] || 0;

  	return (factIndex < (currentScroll + IMAGES_ON_LOAD));
  }
  
  _renderFact = (fact) => {
  	const { item, index } = fact;
  	const { navigation, category, selectedDate } = this.props;

  	const Fact = (
  		<FactCard
		  	fact={item}
        date={selectedDate.factDate}
        canShowDate={false}
		  	isImgShown={this._isImgShown(index, item.img)}
		  	category={category}
		  	navigation={navigation}
	  	/>
  	);

    if (index && index % 13 === 0) {
      return (
        <View>
          <Banner />
          { Fact }
        </View>
      ) 
    }
    return Fact;
  }

  render() {
	  const { allFacts, filteredFacts, selectedDate, filter,
	   category, isReady, onMomentumScrollBegin, 
	   onMomentumScrollEnd, onScroll, onScrollEndDrag } = this.props;
	   
	  let Main;

	  // no facts after a try to rehydrate
	  // or fetch the facts from API

		if(isReady && _.isEmpty(allFacts[selectedDate.factDate])){

	    Main = <NetworkProblem solveConnection={this._refetchFacts} />;

	  } else if (_.has(filteredFacts, category) && !filteredFacts[category].length) {

	  	Main = (
	  		<View style={gStyles.screenMiddle}>		
	  			<Text>Your search - { filter.search }  - did not match any { category }.</Text>
	  		</View>
	  	)

	  } else {
	  	Main = (
	  		<View style={styles.container}>
	  			{ !isReady && <Loader isAnimating={!isReady} hasQuote={false} /> }
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
		        initialNumToRender={4}
		      />
        </View>
  		)
	  }

    return (
    	<View style={styles.container}>
    		{ Main }
    	</View>
    ) 
  	
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
  list: {
  	paddingTop: HEADER_HEIGHT
  }
});

const mapStateToProps = ({ adMob }) => ({
  adMobCounter: adMob.factsCounter
});

const mapDispatchToProps = (dispatch) => ({
  showInterstitial: (counterName) => {
    dispatch(showInterstitial(counterName))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FactsScreen);