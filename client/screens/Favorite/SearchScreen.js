import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';

// ACTIONS
import { removeFavorite, changeSearch, toggleCategory } from './actions';
import { copyToClipboard } from '../FactDetail/actions';
import { openModal } from '../../components/Modal/actions';

// COMPONENTS
import ArrowBack from '../../components/ArrowBack';
import ArticleCard from '../../components/ArticleCard';
import CheckBox from '../../components/CheckBox';
import FactCard from '../../components/FactCard';
import Favorites from './Favorites';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import VideoCard from '../../components/VideoCard';
import { createCardMenuOptions } from './helpers/facts';

import { filterBySearch } from '../../utils/filters';

import { COLORS } from '../../constants/components';
import gStyles from '../../styles';


class SearchScreen extends PureComponent {

  _searchField = () => {
    const { search, changeSearch } = this.props;

    return {
      value: search,
      onChangeText:  (text) => changeSearch(text),
      placeholder: 'Search in Favorites'
    } 
  }

  _renderFact = ({item}) => {
    const { navigation } = this.props;
    const { copyToClipboard, removeFavorite } = this.props;
    const copy = () => copyToClipboard(item.text);
    const remove = () => removeFavorite(item.id, 'facts');
    return (
      <FactCard 
        {...item}
        isFavorite={true}
        navigation={navigation}
        menuOptions={createCardMenuOptions(item, item.text, copy, remove)}
      />
    );
  }

  _renderArticle = ({item}) => {
    const { copyToClipboard, removeFavorite } = this.props;
    const copy = () => copyToClipboard(item.title);
    const remove = () => removeFavorite(item.id, 'articles');
    return (
      <ArticleCard
        {...item}
        menuOptions={createCardMenuOptions(item, item.title, copy, remove)}
      />
    );
  }

   _renderVideo = ({item}) => {
    return (
      <VideoCard
        onVideoPress={this._onVideoPress}
        menuOptions={this._cardMenuOptions(item)}
        {...item}
      />
    ) 
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
    const { navigation, categories, facts, articles, toggleCategory,
     removeFavorite, copyToClipboard } = this.props;

    return (
      <View style={styles.screenContainer}>
        <Header
          navigation={navigation}
          leftComponent={<ArrowBack navigation={navigation} />}
          rightComponent={this._categoriesIcon()}
          search={this._searchField()}
        />

        <ScrollView style={gStyles.screenBody}>

          { categories.facts &&
            <View style={styles.categoryContainer}>
              <View style={styles.categoryLabelContainer}>
                <Text style={styles.categoryLabel}>
                  FACTS
                </Text>
              </View>
              <Favorites
                data={facts}
                category='facts'
                renderFavorite={this._renderFact}
              />
            </View>
          }

          { categories.articles &&
            <View style={styles.categoryContainer}>
              <View style={styles.categoryLabelContainer}>
                <Text style={styles.categoryLabel}>
                  ARTICLES
                </Text>
              </View>
              <Favorites
                data={articles}
                category='articles'
                renderFavorite={this._renderArticle}
              />
            </View>
          }
          

        </ScrollView>

        <Modal name='categoriesFavorite'>
          <View style={styles.categoriesContainer}>
            <CheckBox
              title='Facts'        
              checked={categories['facts']}
              onPress={() => toggleCategory('facts')}
            />
            <CheckBox
              title='Articles'        
              checked={categories['articles']}
              onPress={() => toggleCategory('articles')}
            />            
            <CheckBox
              title='Videos'        
              checked={categories['videos']}
              onPress={() => toggleCategory('videos')}
            />
            <CheckBox
              title='Books'        
              checked={categories['books']}
              onPress={() => toggleCategory('books')}
            />
          </View> 
        </Modal>
      </View>
    );
  }
}


const mapStateToProps = ({ favorite }) => {
  const { search, categories, facts,
    articles, videos, books } = favorite;
  return {
    search,
    categories,
    facts: filterBySearch(facts, search, ['text'] ),
    articles: filterBySearch(articles, search, ['title'] ),
    videos,
    books
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeSearch: (search) => {
    dispatch(changeSearch(search));
  },
  toggleCategory: (category) => {
    dispatch(toggleCategory(category))
  },
  copyToClipboard: (content) => {
    dispatch(copyToClipboard(content))
  },
  removeFavorite: (id, category) => {
    dispatch(removeFavorite(id, category));
  },
  openModal: (name) => {
    dispatch(openModal(name));
  }
});

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  categoryContainer: {
    flex: 1
  },
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
  },
  categoryLabelContainer: {
    flex: 1,
    padding: 10,
    borderBottomColor: '#777',
    borderBottomWidth: 1
  },
  categoryLabel: {
    color: '#777',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 4
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);