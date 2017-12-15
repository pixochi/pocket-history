import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import FactCard from '../../components/FactCard';
import Header from '../../components/Header';
import GuessCard from './components/GuessCard';
import MenuIcon from '../../components/MenuIcon';

import { fetchFacts, getGameFacts, flipCards, selectAnswer } from './actions';

import { COLORS } from '../../constants/components';
import gStyles from '../../styles';


class WhichHappenedSooner extends PureComponent {

  state = {}

  componentDidMount() {
    this.props.fetchFacts();
  }

  componentWillReceiveProps(nextProps) {
    const { facts, getGameFacts } = this.props;

    if (_.isEmpty(facts) && !_.isEmpty(nextProps.facts)) {    
      getGameFacts(nextProps.facts);
    }
  }

  _selectAnswer = (answer) => {
    const { gameFacts, selectAnswer } = this.props;
    let correct;
    const compareToId = answer.id === 0 ? 1 : 0;
    console.log(gameFacts)
    if (answer.timestamp < gameFacts[compareToId].timestamp) {
      selectAnswer(true);
    } else if (answer.timestamp > gameFacts[compareToId].timestamp) {
      selectAnswer(false);
    } else {
      console.log('DRAW');
    }
  }

  _renderFront = (fact) => {
    return (
      <TouchableHighlight onPress={() => this._selectAnswer(fact)}>
        <View style={styles.container}>
        {
          fact &&
          <FactCard
            html={fact.text}
            canShowDetail={false}
            isImgShown={true}
          />
        }
        </View>
      </TouchableHighlight>
    ) 
  }

  _renderBack = (fact) => {
    return (
      <View style={styles.container}>
      {
        fact &&
        <FactCard 
          {...fact}
          isImgShown={true}
          navigation={this.props.navigation}
        />
      }
      </View>
    )
  }

  render() {
    const { navigation, gameFacts, flip, flipCards, score, bestScore } = this.props;
    return (
      <View style={styles.screenContainer}>
        <Header
          title='Which Happened Sooner?'
          leftComponent={<MenuIcon navigation={navigation}/>}
          rightComponent={<View />}
        />
        <View style={gStyles.screenBody}>
          
          <ScrollView>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>
                Score: { score }
              </Text>
              <Text style={styles.scoreText}>
                Best Score: { bestScore }
              </Text>
            </View>

            <View style={styles.cardsContainer}>
              <GuessCard 
                front={this._renderFront(gameFacts[0])}
                back={this._renderBack(gameFacts[0])}
                flip={flip}
              />
              <GuessCard 
                front={this._renderFront(gameFacts[1])}
                back={this._renderBack(gameFacts[1])}
                flip={flip}
              />
            </View>
          </ScrollView>
          

          <Text onPress={() => flipCards()}>
            FLIP
          </Text>
        </View>
      </View>
    );
  }
}

WhichHappenedSooner.navigationOptions = ({navigation}) => ({
  header: null,
  drawerLabel: 'Which Happened Sooner',
  drawerIcon: ({tintColor}) => (
    <Icon 
      name='cards' 
      type='material-community' 
      color={tintColor} 
      size={28} 
    />
  )
});

WhichHappenedSooner.propTypes = {
  navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.cardBackground,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.yellowLight
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  cardsContainerContent: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
    flex:1
  }
});

const mapDispatchToProps = (dispatch) => ({
  fetchFacts: () => {
    dispatch(fetchFacts());
  },
  getGameFacts: (facts) => {
    dispatch(getGameFacts(facts));
  },
  flipCards: () => {
    dispatch(flipCards());
  },
  selectAnswer: (correct) => {
    dispatch(selectAnswer(correct))
  }
});

const mapStateToProps = ({happenedSooner}) => {
  const { facts, gameFacts, flip, score,
   bestScore, isLoading, error } = happenedSooner;

  return {
    facts,
    gameFacts,
    flip,
    score,
    bestScore,
    isLoading,
    error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WhichHappenedSooner);