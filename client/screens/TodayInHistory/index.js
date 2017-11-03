import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  AsyncStorage
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

// ACTIONS
import { fetchFacts, changeDate } from './actions';

// SCREENS
import Events from './Events';
import Births from './Births';
import Deaths from './Deaths';
import News from './News';

// COMPONENTS
import { Calendar } from 'react-native-calendars';
import FactCard from '../../components/FactCard';

//CONSTANTS
import { HEADER_HEIGHT } from '../../constants/components';

const FactsCategories = TabNavigator({
  events: { screen: Events },
  births: { screen: Births },
  deaths: { screen: Deaths },
  news: { screen: News }
}, { tabBarPosition: 'bottom', lazy: true });

class TodayInHistory extends Component {
  static navigationOptions = {
    headerTitle: 'Today In History',
    drawerLabel: 'Today In History'
  };

  state = {
    scrollAnim: new Animated.Value(0),
    offsetAnim: new Animated.Value(0),
  };

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
    console.log('navigation changed')
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
        duration: 500,
      }).start();
    }
  };

  componentDidMount() {
    // AsyncStorage.clear();
     this.state.scrollAnim.addListener(this._handleScroll);
  }

  componentWillUnMount() {
     this.state.scrollAnim.removeListener(this._handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    const { facts, rehydrated, isLoading, 
      isOnline, selectedDate, fetchFacts } = nextProps;

    const selectedFacts = facts[selectedDate];
    const dateChanged = selectedDate !== this.props.selectedDate;

    if (!isLoading && isOnline && rehydrated && _.isEmpty(selectedFacts) ) {
      fetchFacts(nextProps.selectedDate);
    }
  }

  // default rendering of each fact
  renderFact = ({ item }) => {
    return (
      <FactCard
        text={item.text}
        year={item.year}
      />
    )
  }

  moveByDay = (direction) => {
    const d = new Date(this.props.selectedDate);
    d.setDate(d.getDate() + direction);
    this.props.changeDate(d);
  }

  translateY = Animated.add(this.state.scrollAnim, this.state.offsetAnim).interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp'
    });

  render() {
    const { facts, isLoading, rehydrated, selectedDate, changeDate } = this.props;
    const selectedFacts = facts[selectedDate];

    const screenProps = {
      selectedFacts,
      renderFact: this.renderFact,
      isReady: (!isLoading && rehydrated),
      onScroll: Animated.event(
        [ { nativeEvent: { contentOffset: { y: this.state.scrollAnim } } } ],
      ),
      onMomentumScrollBegin: this._handleMomentumScrollBegin,
      onMomentumScrollEnd: this._handleMomentumScrollEnd,
      onScrollEndDrag: this._handleScrollEndDrag
    }

    const translateY = this.translateY;
    return (
      <View style={styles.factsContainer}>
        <Animated.View style={[styles.header, { transform: [{translateY}] }]}>
          <Icon 
            name='keyboard-arrow-left'
            size={44}
            onPress={() => this.moveByDay(-1)} 
          />
          <Text style={styles.headerDate}>
            { selectedDate }
          </Text>
          <Icon 
            name='keyboard-arrow-right'
            size={44}
            onPress={() => this.moveByDay(1)} 
          />
        </Animated.View>
        <FactsCategories
          onNavigationStateChange={this._showDate}
          screenProps={screenProps} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  factsContainer: {
    flex: 1
  },
  header: {
    backgroundColor: 'green',
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000
  },
  headerDate: {
    fontSize: 25
  }
});

const mapStateToProps =
  ({ historyOnDay: { facts, selectedDate, isLoading }, offline, persist}) => (
    {
      facts,
      selectedDate,
      isLoading,
      isOnline: offline.online,
      rehydrated: persist.rehydrated
    }
)

const mapDispatchToProps = (dispatch) => ({
  fetchFacts: (date) => {
    dispatch(fetchFacts(date));
  },
  changeDate: (date) => {
    dispatch(changeDate(date));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(TodayInHistory);