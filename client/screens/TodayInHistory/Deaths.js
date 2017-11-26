import React, { PureComponent } from 'react';

import FactsScreen from './FactsScreen';


class Deaths extends PureComponent {
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