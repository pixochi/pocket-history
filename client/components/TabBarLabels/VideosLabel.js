import React, { PureComponent } from 'react';

import TabBarLabel from './TabBarLabel';


class VideoLabel extends PureComponent {
	render() {
		const icon = {
      name: 'youtube-play',
      type: 'font-awesome'
    }

		return (
			<TabBarLabel text='Videos' icon={icon} />
		)
	}
}


export default VideoLabel;

      