import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';

import { getRandomNumber } from '../utils/random';

import { COLORS } from '../constants/components';

const QUOTES = [
		"Patience is the companion of wisdom.",
		"Patience is not simply the ability to wait - it's how we behave while we're waiting.",
		"You usually have to wait for that which is worth waiting for.",
		"There is nothing new in the world except the history you do not know.",
		"Those who do not remember the past are condemned to repeat it.",
		"History repeats itself. So you might wanna pay attention.",
		"An investment in knowledge pays the best interest.",
		"The good life is one inspired by love and guided by knowledge.",
		"The art and science of asking questions is the source of all knowledge.",
		"Learn from yesterday, live for today, hope for tomorrow.",
		"You learn more from losing than winning. You learn how to keep going.",
		"We do not remember days, we remember moments.",
		"You only live once, but if you do it right, once is enough.",
		"There is nothing new in the world except the history you do not know.",
		"We are not makers of history. We are made by history.",
	]

class Loader extends PureComponent {

	static propTypes = {
	  isAnimating: PropTypes.bool
	}

	static defaultProps = {
	  isAnimating: true
	}

	// shows a message if loading takes
	// more than specified time
	state = {
		message: '',
		timer: 0,
	}

	

	componentDidMount() {
	  this._startInterval();
	}

	componentWillUnmount() {
	  clearInterval(this._interval);
	}

	componentWillReceiveProps(nextProps) {
	  if (!nextProps.isAnimating) {
	  	clearInterval(this._interval);
	  	this.setState({ message: '' });
	  }
	}

	_getQuote = () => {
		const max = QUOTES.length === 0 ? 0 : QUOTES.length-1;
		const index = getRandomNumber(0, QUOTES.length-1);
		return QUOTES[index];
	}

	_startInterval(){
		this._interval = setInterval(
			() => this.setState({ message: this._getQuote() }
		), 6000);
	}

	

	render() {
		const canShowMessage = this.state.isMessageVisible && this.props.animating;
		const indicatorSize = Platform.OS === 'android' ? 70 : 'large';
		return (
			<View style={styles.spinner}>
				<ActivityIndicator 
					size={indicatorSize}
					animating={this.props.animating}
					color={COLORS.yellowDark}
				/>
				<Text style={styles.message}>
			  	{ this.state.message }
				</Text> 
			</View>
		); 
	}
	
}

const styles = StyleSheet.create({
	spinner: {
		position: 'absolute',
		zIndex: -1000,
		justifyContent: 'center',
		alignItems: 'center',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	message: {
		textAlign: 'center',
		fontSize: 25,
		color: '#517fa4',
		marginTop: 25,
		marginBottom: 25
	}
});
 
 
 export default Loader; 
