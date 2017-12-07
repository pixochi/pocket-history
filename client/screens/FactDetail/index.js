import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';

import { addFavorite } from '../Favorite/actions';
import { copyToClipboard } from './actions';

import { RoutesFactDetail } from '../../navigation/factDetail';

class FactDetail extends PureComponent {
	render() {
		const { addFavorite, copyToClipboard, navigation } = this.props;
		return (
			<RoutesFactDetail screenProps={{addFavorite, copyToClipboard, navigation}} />
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  addFavorite: (item, category) => {
    dispatch(addFavorite(item, category));
  },
  copyToClipboard: (content) => {
    dispatch(copyToClipboard(content));
  }
});


export default connect(null, mapDispatchToProps)(FactDetail);
