import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { toCalendarDate } from '../../utils/date';
import { filterBySearch, sortByDate } from '../../utils/filters';

// ACTIONS
import * as actionCreators from './actions';
import { changeRoute } from '../../navigation/actions';
import { addFavorite } from '../Favorite/actions';
import { copyToClipboard } from '../FactDetail/actions';
import { openModal } from '../../components/Modal/actions';

// COMPONENTS
import CalendarModal from '../../components/CalendarModal';
import Options from '../../components/Options';
import DateHeader from '../../components/DateHeader';
import Header from '../../components/Header';
import MenuIcon from '../../components/MenuIcon';

import { RoutesFactCategories } from '../../navigation/todayInHistory';

//CONSTANTS
import { HEADER_HEIGHT, COLORS } from '../../constants/components';

import gStyles from '../../styles';


const APPROXIMATE_FACT_CARD_HEIGHT = 250;

class TodayInHistory extends PureComponent {

  // only visual stuff
  state = {
    scrollAnim: new Animated.Value(0),
    offsetAnim: new Animated.Value(0),
    isModalVisible: false,
    itemsScrolled: {}
  };

  componentDidMount() {
    // AsyncStorage.clear();
    this.state.scrollAnim.addListener(this._handleScroll);
  }

  componentWillUnMount() {
    this.state.scrollAnim.removeListener(this._handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    const { allFacts, selectedDate, selectedCategory,
      fetchFacts, fetchFactsImages, isOnline, filter, imgFetchSrc } = nextProps;
    const dateChanged = this.props.selectedDate.factDate !== selectedDate.factDate;
    const categoryChanged = this.props.selectedCategory !== selectedCategory;
    const hasImages = _.get(allFacts,`[${selectedDate.factDate}].images[${selectedCategory}]`, false);

    if (this._canFetchFacts(nextProps) && _.isEmpty(allFacts[selectedDate.factDate]) ) {
      fetchFacts(nextProps.selectedDate.timestamp);
    }

    if (dateChanged) {
      this.setState({ itemsScrolled: {} });
    }

    if (!hasImages && this._canFetchImages(nextProps)) {
      fetchFactsImages(selectedDate, selectedCategory, allFacts);
    }

    if (this.props.isFetchingImages && (categoryChanged || dateChanged)) {
      if (imgFetchSrc) {
        imgFetchSrc.cancel('Images fetching cancelled');
      } 
    }
  }

  _handleScroll = ({ value }) => {
    this._previousScrollvalue = this._currentScrollValue;
    this._currentScrollValue = value;
  };
  
  _handleScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._handleMomentumScrollEnd, 250);
  };

  _handleMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _showDate = () => {   
    const previous = this._previousScrollvalue;
    const current = this._currentScrollValue;
    const currentDiff = previous - current;

    // date is already shown
    if (this.diff !== currentDiff && (previous <= current || current >= HEADER_HEIGHT) ) {
      Animated.timing(
      this.state.offsetAnim,
      {
        toValue: -this._currentScrollValue,
        duration: 0,
      }
    ).start();
      this.diff = previous - current;
    }  
  }

  _onNavigationStateChange = (prevState, nextState, action) => {
    const { changeRoute } = this.props;
    this._showDate();
    changeRoute(action.routeName);
  }
  
  _handleMomentumScrollEnd = (evt) => {

    const { selectedCategory } = this.props;
    const horizontalOffset = _.get(evt, 'nativeEvent.contentOffset.y', 0);
    const itemsScrolled = Math.floor(horizontalOffset/APPROXIMATE_FACT_CARD_HEIGHT);
    const currentScroll = this.state.itemsScrolled[selectedCategory] || 0;

    if (itemsScrolled > currentScroll) {
      let newScroll = {};
      newScroll[selectedCategory] = itemsScrolled
      this.setState({ 
        itemsScrolled: {
          ...this.state.itemsScrolled,
          ...newScroll
        } 
      });
    }
    

    const previous = this._previousScrollvalue;
    const current = this._currentScrollValue;
    
    if (previous > current || current < HEADER_HEIGHT) {
      Animated.spring(this.state.offsetAnim, {
        toValue: -current,
        tension: 300,
        friction: 35,
      }).start();
    } else {
      Animated.timing(this.state.offsetAnim, {
        toValue: 0,
        duration: 300,
      }).start();
    }
  };

  _canFetch = (props) => {
    const { rehydrated, isOnline} = props;
    return (isOnline && rehydrated);
  }

  _canFetchImages = (props) => {
    const { isFetchingImages, allFacts, 
      selectedDate, selectedCategory, imgErr } = props;
    const nextFacts = _.get(allFacts, `[${selectedDate.factDate}][${selectedCategory}]`, false);
    const hasFacts = !_.isEmpty(nextFacts);

    return (!isFetchingImages && hasFacts && this._canFetch(props));
  }

  _canFetchFacts = (props) => {
    return (!props.isLoading && this._canFetch(props));
  }

  closeModal = () => {
    this.setState({ isModalVisible: false });
  }

  openModal = () => {
    this.setState({ isModalVisible: true });
  }

  _openFilter = () => {
    this.props.openModal('factsFilter');
  }

  translateY = Animated.add(this.state.scrollAnim, this.state.offsetAnim).interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp'
  });

  render() {
    const { filteredFacts, allFacts, filter, addFavorite, copyToClipboard,
     isLoading, rehydrated, selectedDate, selectedCategory, changeDate, fetchFacts,
      changeFilter, navigation } = this.props;

    const { itemsScrolled } = this.state;

    const handleScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim }}}]
    );

    const screenProps = {
      navigation,
      allFacts,
      filteredFacts,
      filter,
      selectedDate,
      itemsScrolled,
      addFavorite,
      changeDate,
      copyToClipboard,
      renderFact: this.renderFact,
      isReady: (!isLoading && rehydrated),
      canFetch: this._canFetchFacts(this.props),
      fetchFacts: fetchFacts,
      onScroll: handleScroll,
      onMomentumScrollBegin: this._handleMomentumScrollBegin,
      onMomentumScrollEnd: this._handleMomentumScrollEnd,
      onScrollEndDrag: this._handleScrollEndDrag
    }

    const translateY = this.translateY;

    return (
      <View style={styles.container}>
        <Header 
          title='Today In History' 
          navigation={navigation}
          leftComponent={<MenuIcon navigation={navigation} />}
          rightComponent={<Options changeFilter={changeFilter} />}
        />
        <View style={gStyles.screenBody}>
          <CalendarModal 
            isVisible={this.state.isModalVisible}
            currentDate={toCalendarDate(selectedDate.timestamp)} 
            changeDate={changeDate}
            closeModal={this.closeModal}
          />

          <DateHeader
            headerStyle={{ transform: [{translateY}] }}
            selectedDate={selectedDate}
            changeDate={changeDate}
            openModal={this.openModal}
          />

          <RoutesFactCategories
            onNavigationStateChange={this._onNavigationStateChange}
            screenProps={screenProps} 
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const filterFacts = (facts = {}, { search = '', sort }) => {
  if (_.isEmpty(facts)) { return facts; }
  let filteredFacts = {...facts};
  Object.keys(facts).forEach(category => {
    if (search) {
      filteredFacts[category] = filterBySearch(facts[category], search, ['text']);
    }
    if (sort) {
      filteredFacts[category] = sortByDate(filteredFacts[category], sort, 'year');
    }
  });

  return filteredFacts;  
}

const mapStateToProps = ({ historyOnDay, offline, persist }) => {
  const { facts, filter, selectedDate, selectedCategory, 
    isLoading, imgFetchSrc, imgErr, isFetchingImages } = historyOnDay;

  return {
    allFacts: facts,
    filteredFacts: filterFacts(facts[selectedDate.factDate], filter),
    filter,
    selectedDate,
    selectedCategory,
    isLoading,
    isFetchingImages,
    imgFetchSrc,
    imgErr,
    isOnline: offline.online,
    rehydrated: persist.rehydrated
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...actionCreators,
    changeRoute,
    addFavorite,
    copyToClipboard,
    openModal, 
  }, dispatch)
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodayInHistory);