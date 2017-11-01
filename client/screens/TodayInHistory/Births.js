import React, { Component } from 'react';

import FactsScreen from './FactsScreen';


class Births extends Component {
  render() {
    const { screenProps } = this.props;
    
    return (
    	<FactsScreen 
    		{...screenProps}
    		category='Births'
    	/>
    )
  }
}


export default Births;