import React, { PureComponent } from 'react';

import TabBarLabel from './TabBarLabel';


class FactsLabel extends PureComponent {
	render() {
		const icon = {
      name: 'archive',
      type: 'entypo'
    }

		return (
			<TabBarLabel text='Facts' icon={icon} />
		)
	}
}


export default FactsLabel;

      