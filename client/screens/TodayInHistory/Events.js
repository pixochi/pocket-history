import React, { PureComponent } from 'react';

import FactsScreen from './FactsScreen';


class Events extends PureComponent {
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