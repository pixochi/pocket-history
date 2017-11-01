import React, { Component } from 'react';

import FactsScreen from './FactsScreen';


class Deaths extends Component {
  render() {
    const { screenProps } = this.props;

    return (
    	<FactsScreen 
    		{...screenProps}
    		category='Deaths'
    	/>
    ) 
  }
}


export default Deaths;