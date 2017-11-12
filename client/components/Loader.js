import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';


class Loader extends Component {
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
		), 2500);
	}

	componentDidMount() {
	  this._startTimer();
	}

	componentWillUnmount() {
		this.setState({ isMessageVisible: false });
	  this._timer = null;
	}

	render() {
		const canShowMessage = this.state.isMessageVisible && this.props.animating;

		return (

			<View style={styles.spinner}>
				{ canShowMessage && 
					<Text style={styles.message}>
					  Connection: OK 
					</Text> 
				}
				<ActivityIndicator 
					size={70} 
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
