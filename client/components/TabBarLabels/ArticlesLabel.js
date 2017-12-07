import React, { PureComponent } from 'react';

import TabBarLabel from './TabBarLabel';


class ArticlesLabel extends PureComponent {
	render() {
		const icon = {
      name: 'file-text',
      type: 'font-awesome'
    }

		return (
			<TabBarLabel text='Articles' icon={icon} />
		)
	}
}


export default ArticlesLabel;

      