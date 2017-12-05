import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { removeFavorite, changeFilter } from './actions';
import { openModal } from '../../components/Modal/actions';

import ArrowBack from '../../components/ArrowBack';
import CheckBox from '../../components/CheckBox';
import FactCard from '../../components/FactCard';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import { copy, share, remove } from '../../components/utils/cardMenuOptions';

import { COLORS } from '../../constants/components';


class SearchScreen extends PureComponent {

  _searchField = () => {
    const { filter, changeFilter } = this.props;

    return {
      value: filter.search,
      onChangeText:  (text) => changeFilter({ search: text }),
      placeholder: 'Search in Favorites'
    } 
  }

  _openCategoriesModal = () => {
    const { openModal } = this.props;
    openModal('categoriesFavorite');
  }

  _categoriesIcon = () => {
    return (
      <Icon 
        name='folder-open'
        type='material-icon'
        color={COLORS.actionIcon}
        underlayColor={COLORS.headerIconUnderlay}
        iconStyle={styles.categoriesIcon}
        containerStyle={styles.categoriesIconContainer}
        onPress={this._openCategoriesModal}
      />
    )
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Header
          navigation={navigation}
          leftComponent={<ArrowBack navigation={navigation} />}
          rightComponent={this._categoriesIcon()}
          search={this._searchField()}
        />

        <Modal name='categoriesFavorite'>
          <View style={styles.categoriesContainer}>

            <CheckBox
              title='Facts'        
              checked={true}
            />
            <CheckBox
              title='Articles'        
              checked={false}
            />            
            <CheckBox
              title='Videos'        
              checked={true}
            />
            <CheckBox
              title='Books'        
              checked={true}
            />
          </View> 
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  categoriesIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesIcon: {
    padding: 4
  },
  categoriesContainer: {
    backgroundColor: '#ddd',
    borderRadius: 7
  }
});

const mapStateToProps = ({ favorite }) => ({
  filter: favorite.filter,
});

const mapDispatchToProps = (dispatch) => ({
  changeFilter: (changedFilter) => {
    dispatch(changeFilter(changedFilter));
  },
  openModal: (name) => {
    dispatch(openModal(name));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);