import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Platform
} from 'react-native';


class Loader extends PureComponent {
	static defaultProps = {
	  animating: true
	}

	// shows a message if loading takes
	// more than specified time
	state = {
		isMessageVisible: false
	}

	_startTimer(){
		this._timer = setTimeout(
			() => this.setState({ isMessageVisible: true }
		), 3000);
	}

	componentDidMount() {
	  this._startTimer();
	}

	componentWillUnmount() {
	  clearTimeout(this._timer);
	}

	render() {
		const canShowMessage = this.state.isMessageVisible && this.props.animating;
		const indicatorSize = Platform.OS === 'android' ? 70 : 'large';
		return (
			<View style={styles.spinner}>
				<ActivityIndicator 
					size={indicatorSize}
					animating={this.props.animating}
					color='#B351E1'
				/>
				{ canShowMessage && 
					<Text style={styles.message}>
				  	Patience is the companion of wisdom.
					</Text> 
				}
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
