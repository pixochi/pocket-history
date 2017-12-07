import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeFilter } from './actions';

import ArrowBack from '../../components/ArrowBack';
import Header from '../../components/Header';
import Options from '../../components/Options';


class FactDetailHeader extends PureComponent {
	static propTypes = {
	  title: PropTypes.string,
	  navigation: PropTypes.object
	}

	_onSearchChange = (text) => {
		this.props.changeFilter({search: text});
	}

  _renderSearch = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        value={this.props.filter.search}
        onChangeText={this._onSearchChange}
        placeholder='Search in Timeline'
        underlineColorAndroid='transparent'
      />
    </View>
 	);

 	_renderSort = () => (
 		<Options changeFilter={this.props.changeFilter} />
 	)
 	
 	_goBack = () => {
 		const { navigation, changeRoute } = this.props;
 		changeRoute('articles');
 		navigation.goBack();
 	}

  render() {
  	const { selectedRoute, navigation } = this.props;
  	const title = selectedRoute === 'timeline' ? '' : 'Library';
  	const rightComponent = selectedRoute === 'timeline' ? this._renderSort() : null;

    return (
     <Header
     		leftComponent={<ArrowBack navigation={navigation} onPress={this._goBack} />}
     		centerComponent={this._renderSearch()}
     		rightComponent={rightComponent}
		    title={title}
		    navigation={navigation}
		  />
    );
  }
}

const mapStateToProps = ({factDetail}) => ({
	selectedRoute: factDetail.selectedRoute,
	filter: factDetail.timeline.filter
});

const mapDispatchToProps = (dispatch) => ({
	changeFilter: (filter) => {
		dispatch(changeFilter(filter));
	}
});

const styles = StyleSheet.create({
	searchContainer: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal:10,
    backgroundColor: 'white',  
    borderRadius:5
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(FactDetailHeader);