import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import FlipCard from 'react-native-flip-card'
import PropTypes from 'prop-types';


class GuessCard extends Component {

  render() {
    return (
      <View style={styles.cardContainer}> 
        <FlipCard
          flipHorizontal={true}
          flipVertical={false}
          flip={this.props.flip}
          clickable={false}
          perspective={1000}
          style={styles.card}
        > 
          <View style={{flex: 1}}> 
            { this.props.front }
          </View> 
          <View style={{flex: 1}}> 
           { this.props.back }
          </View>
        </FlipCard> 
      </View>
    );
  }
}

GuessCard.propTypes = {
  front: PropTypes.node.isRequired,
  back: PropTypes.node.isRequired,
  flip: PropTypes.bool
}

GuessCard.defaultProps = {
	flip: false
}

const styles = StyleSheet.create({
	cardContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  card: {
    flex: 1,
    borderWidth: 0
  }
});


export default GuessCard;