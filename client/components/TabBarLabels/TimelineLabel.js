import React, { PureComponent } from 'react';

import TabBarLabel from './TabBarLabel';


class TimelineLabel extends PureComponent {
	render() {
		const icon = {
      name: 'chart-timeline',
      type: 'material-community'
    }

		return (
			<TabBarLabel text='Timeline' icon={icon} />
		)
	}
}


export default TimelineLabel;

      