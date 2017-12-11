import React, { PureComponent } from 'react';
import { Notifications } from 'expo';

import FactsScreen from './FactsScreen';


class Events extends PureComponent {

	state = {};

	componentWillMount() {
	   console.log(this.props)
	  this._notificationSubscription = Notifications.addListener(this._handleNotification);
    // this.props.navigation.navigate('Deaths')
	}

	_handleNotification = ({ data }) => {
		const { timestamp, category } = data;
		const { navigation } = this.props;
		const { changeDate } = this.props.screenProps;
		console.log('HEY NOTIFICATION!');
		console.log(data);

		navigation.navigate(category);
		changeDate(parseInt(timestamp));
  };

  render() {	     
    const { screenProps } = this.props;

    return (
    	<FactsScreen 
    		{...screenProps}
    		category='Events'
    	/>
    )   
  }
}


export default Events;