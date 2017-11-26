import React, { PureComponent } from 'react';

import FactsScreen from './FactsScreen';


class Births extends PureComponent {
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