import React, { PureComponent } from 'react';
import { Notifications } from 'expo';

import FactsScreen from './FactsScreen';


class Events extends PureComponent {

	componentWillMount() {
	  this._notificationSubscription = Notifications.addListener(this._handleNotification);
	}

	_handleNotification = (notification) => {
		console.log(notification)
		const { data } = notification;
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
    		scrollToIndex={20}
    	/>
    )   
  }
}


export default Events;