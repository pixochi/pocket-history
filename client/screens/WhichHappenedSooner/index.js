import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  Dimensions,
  AppState
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import _ from 'lodash';

import FactCard from '../../components/FactCard';
import Header from '../../components/Header';
import GuessCard from './components/GuessCard';
import Loader from '../../components/Loader';
import MenuIcon from '../../components/MenuIcon';
import NetworkProblem from '../../components/NetworkProblem';
import ResultBox from './components/ResultBox';

import * as actionCreators from './actions';
import { showInterstitial } from '../../components/AdMob/actions';

import { COLORS } from '../../constants/components';
import gStyles from '../../styles';


class WhichHappenedSooner extends PureComponent {

  state = {}

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.timer === 0) {
      nextProps.stopGame();
    }
    if (nextProps.adMobCounter === 10) {
      this.props.showInterstitial('happenedSoonerCounter');
    }
    this._createResultMessage(nextProps);
  }

  componentWillUnmount() {
    if (!this.props.flip) {
      this.props.stopGame();
    } 
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState.match(/inactive|background/) && !this.props.flip) {
      this.props.stopGame();
    }
  }

  _createResultMessage = (nextProps) => {
    const { score, bestScore } = nextProps;

    if (bestScore > this.props.bestScore) {
      this._resultMessage = `New best score: ${bestScore}`;
    } else if (score === 0) {
      this._resultMessage = `Final score: ${this.props.score}`;
    } else {
      this._resultMessage = (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            Score: {score}
          </Text>
          <Text style={styles.message}>
            Score to beat: {bestScore}
          </Text>
        </View>
      )
      return;
    }

    this._resultMessage = (
      <Text style={styles.message}>
        { this._resultMessage }
      </Text>
    )
  }

  _selectAnswer = (answer) => {
    const { gameFacts, selectAnswer } = this.props;
    const compareToId = answer.id === 0 ? 1 : 0;

    if (answer.timestamp <= gameFacts[compareToId].timestamp) {
      selectAnswer(true);
    } else {
      selectAnswer(false);
    }
  }

  _renderFront = (fact) => {
    return (
      <TouchableHighlight 
        onPress={() => this._selectAnswer(fact)}
        underlayColor={'rgba(0,0,0,.75)'}
        style={styles.container}  
      >
        <View style={styles.container}>
          {
            fact &&
            <FactCard
              fact={{html: fact.text}}
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
        fact && this.props.flip &&
        <FactCard
          fact={fact}
          date={fact.date}
          canShowDate={true}
          category='Events'
          isImgShown={true}
          navigation={this.props.navigation}
        />
      }
      </View>
    )
  }

  _renderContinueButton = (isCorrect) => {
    const { startGame } = this.props;
    const title = isCorrect ? 'Continue' : 'Play again';

    return (
      <Button 
        title={title}
        onPress={startGame}
        buttonStyle={styles.playBtn}
        textStyle={styles.playBtnText}
      />
    )
  }

  render() {
    const { navigation, gameFacts, flip, flipCards, score,
     bestScore, started, startGame, timer, isResultOpen,
      closeResult, isCorrect, isLoading, error } = this.props;
    let Main;

    if (isLoading) {
      Main = (
        <View style={styles.loader}>
          <Loader />
        </View>   
      )   
    } else if (error) {
      Main = (
        <NetworkProblem 
          message={error}
          solveConnection={startGame}
        />
      )
    } else if (started) {
      Main = (
        <View style={styles.container}>
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
        </View> 
      )
    } else {
      Main = (
        <View style={styles.startScreen}>
          <View style={styles.instructions}>
            <Text style={styles.instructionsText}>
              Select the event which happened sooner
            </Text>
          </View>
          
          <Button 
            title='Play'
            onPress={startGame}
            textStyle={styles.playBtnText}
            buttonStyle={styles.playBtn}
          />
        </View>
      )
    }

    return (
      <View style={styles.screenContainer}>
        <Header
          title='Which Happened Sooner?'
          leftComponent={<MenuIcon navigation={navigation}/>}
          rightComponent={<View />}
        />
        <View style={gStyles.screenBody}>
          
          <ScrollView style={[styles.container, styles.scroller]}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>
                Score: { score }
              </Text>
              <Text style={styles.scoreText}>
                Best Score: { bestScore }
              </Text>
            </View>

            <View style={styles.timerContainer}>
              <AnimatedCircularProgress
                size={70}
                width={8}
                fill={(100/15)*timer}
                prefill={0}
                rotation={0}
                tintColor={COLORS.header}
                backgroundColor={COLORS.yellowDark}
                style={styles.timer}
              >
                { () => (
                    <Text style={styles.timerText}>
                      { timer }
                    </Text>
                  )
                }
              </AnimatedCircularProgress>
            </View>
            
            { Main }

            { flip && this._renderContinueButton(isCorrect) }

          </ScrollView>
          
          <ResultBox
            message={this._resultMessage}
            isOpen={isResultOpen}
            isCorrect={isCorrect}
            onClosed={closeResult}
          />
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
      name='trophy' 
      type='font-awesome' 
      color={tintColor} 
      size={26} 
    />
  )
});

WhichHappenedSooner.propTypes = {
  navigation: PropTypes.object.isRequired
}

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  loader: {
    minWidth: width - 20,
    minHeight: height/2,
    justifyContent: 'center',
    alignItems: 'center'
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
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  timer: {
    marginTop: 35,
  },
  timerText: {
    position: 'relative',
    bottom: 55,
    textAlign: 'center',
    fontSize: 27,
    color: COLORS.greyDark
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  cardsContainerContent: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  startScreen: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  instructions: {
    marginBottom: 15
  },
  instructionsText: {
    padding: 5,
    textAlign: 'center',
    fontSize: 25,
    color: COLORS.greyDark
  },
  playBtn: {
    marginVertical: 5,
    borderRadius: 4,
    backgroundColor: COLORS.yellowDark,
  },
  playBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  continueBtn: {
    backgroundColor: COLORS.yellowDark
  },
  messageContainer: {
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    flex:1,
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actionCreators, dispatch),
    showInterstitial: (counterName) => dispatch(showInterstitial(counterName)),
  }
}

const mapStateToProps = ({happenedSooner, adMob}) => {
  const { gameFacts, flip, score, bestScore,
   started, timer, isResultOpen, isCorrect, isLoading, error } = happenedSooner;

  return {
    gameFacts,
    flip,
    score,
    bestScore,
    started,
    timer,
    isResultOpen,
    isCorrect,
    isLoading,
    error,
    adMobCounter: adMob.happenedSoonerCounter
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WhichHappenedSooner);