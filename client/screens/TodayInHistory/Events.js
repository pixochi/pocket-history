import React, { Component } from 'react';

import FactsScreen from './FactsScreen';


class Events extends Component {
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