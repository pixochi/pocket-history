import React, { PureComponent } from 'react';

import TabBarLabel from './TabBarLabel';


class BooksLabel extends PureComponent {
	render() {
		const icon = {
     	name: 'book-open-page-variant',
      type: 'material-community'
    }

		return (
			<TabBarLabel text='Books' icon={icon} />
		)
	}
}


export default BooksLabel;

      