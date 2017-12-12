import React, { PureComponent } from 'react';
import { Notifications } from 'expo';

import FactsScreen from './FactsScreen';


class Events extends PureComponent {

	componentWillMount() {
	  this._notificationSubscription = Notifications.addListener(this._handleNotification);
	}

	_handleNotification = (notification) => {
		const { data, origin } = notification;
		
		if (origin === 'selected') {
			const { timestamp, category } = data;
			const { navigation, screenProps } = this.props;
			const { changeDate } = screenProps;
			navigation.navigate(category);
			changeDate(parseInt(timestamp));
		}
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