import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  AsyncStorage
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Button, Icon, SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { toCalendarDate } from '../../utils/date';
import { filterBySearch, sortByDate } from '../../utils/filters';

// ACTIONS
import { fetchFacts, changeDate, changeFactsFilter } from './actions';
import { addFavorite } from '../Favorite/actions';
import { copyToClipboard } from '../FactDetail/actions';
import { openModal } from '../../components/Modal/actions';

// SCREENS
import Events from './Events';
import Births from './Births';
import Deaths from './Deaths';
import News from './News';
import FactDetail from '../FactDetail';

// COMPONENTS
import CalendarModal from '../../components/CalendarModal';
import Options from '../../components/Options';
import DateHeader from '../../components/DateHeader';
import Header from '../../components/Header';

//CONSTANTS
import { HEADER_HEIGHT } from '../../constants/components';

import gStyles from '../../styles';

const FactsCategories = TabNavigator({
  events: { screen: Events },
  births: { screen: Births },
  deaths: { screen: Deaths },
  news: { screen: News }
}, { tabBarPosition: 'bottom', lazy: true });

class TodayInHistory extends PureComponent {
  static navigationOptions = {
    headerTitle: 'Today In History',
    drawerLabel: 'Today In History'
  };

  // only visual stuff
  state = {
    scrollAnim: new Animated.Value(0),
    offsetAnim: new Animated.Value(0),
    isModalVisible: false
  };

  componentDidMount() {
    // AsyncStorage.clear();
     this.state.scrollAnim.addListener(this._handleScroll);
  }

  componentWillUnMount() {
     this.state.scrollAnim.removeListener(this._handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    const { allFacts, rehydrated, isLoading, 
      isOnline, selectedDate, fetchFacts } = nextProps;

    const dateChanged = selectedDate.factDate !== this.props.selectedDate.factDate;

    if (this.canFetch(nextProps) && _.isEmpty(allFacts[selectedDate.factDate]) ) {
      fetchFacts(nextProps.selectedDate.timestamp);
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
  
  _handleMomentumScrollEnd = () => {
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

  canFetch = (props) => {
    const { rehydrated, isLoading, isOnline} = props;
    return (!isLoading && isOnline && rehydrated);
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
    const { filteredFacts, allFacts, filter, addFavorite, copyToClipboard, isLoading, rehydrated, selectedDate,
       changeDate, fetchFacts, changeFilter, navigation } = this.props;

    const screenProps = {
      navigation,
      allFacts,
      filteredFacts,
      filter,
      selectedDate,
      addFavorite,
      copyToClipboard,
      renderFact: this.renderFact,
      isReady: (!isLoading && rehydrated),
      canFetch: this.canFetch(this.props),
      fetchFacts: fetchFacts,
      onScroll: Animated.event(
        [ { nativeEvent: { contentOffset: { y: this.state.scrollAnim } } } ],
      ),
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
        rightComponent={<Options changeFilter={changeFilter} />}
      />
      <View style={styles.container}>   
        <View style={styles.screenBody}>
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

          <FactsCategories
            onNavigationStateChange={this._showDate}
            screenProps={screenProps} 
          />
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  screenBody: {
    flex: 1,
    marginTop: 70
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
  const { facts, filter, selectedDate, isLoading } = historyOnDay;
  return {
    allFacts: facts,
    filteredFacts: filterFacts(facts[selectedDate.factDate], filter),
    filter,
    selectedDate,
    isLoading,
    isOnline: offline.online,
    rehydrated: persist.rehydrated
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchFacts: (timestamp) => {
    dispatch(fetchFacts(timestamp));
  },
  changeDate: (date) => {
    dispatch(changeDate(date));
  },
  addFavorite: (item, category) => {
    dispatch(addFavorite(item, category));
  },
  copyToClipboard: (content) => {
    dispatch(copyToClipboard(content));
  },
  changeFilter: (filter) => {
    dispatch(changeFactsFilter(filter));
  },
  openModal: (name) => {
    dispatch(openModal(name));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(TodayInHistory);