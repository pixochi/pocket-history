import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
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
import BookCard from '../../components/BookCard';
import BookModal from '../../components/BookModal';
import CheckBox from '../../components/CheckBox';
import FactCard from '../../components/FactCard';
import Favorites from './Favorites';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import VideoCard from '../../components/VideoCard';
import VideoModal from './components/VideoModal';
import { createCardMenuOptions } from './helpers/facts';

import { filterBySearch } from '../../utils/filters';

import { COLORS } from '../../constants/components';
import { VIDEO_ROOT_URL } from '../../constants/urls';
import gStyles from '../../styles';


class SearchScreen extends PureComponent {

  state = {}

  _renderFact = ({item}) => {
    const { text, date, year } = item;
    const { navigation } = this.props;
    const copyText = `${date}, ${year} - ${text}`;
    const { copyToClipboard, removeFavorite } = this.props;
    const copy = () => copyToClipboard(copyText);
    const remove = () => removeFavorite(item.id, 'facts');    
    return (
      <FactCard 
        {...item}
        isFavorite={true}
        navigation={navigation}
        menuOptions={createCardMenuOptions(item, copyText, copy, remove)}
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

  _onVideoPress = (selectedVideoId) => {
    this.setState({ selectedVideoId }, () => {
      this.props.openModal('favVideo');
    });
  }

  _renderVideo = ({item}) => {
    const url = VIDEO_ROOT_URL+item.id;
    const { copyToClipboard, removeFavorite, openModal } = this.props;
    const copy = () => copyToClipboard(url);
    const remove = () => removeFavorite(item.id, 'videos');
    return (
      <VideoCard
        onVideoPress={this._onVideoPress}
        menuOptions={createCardMenuOptions(item, url, copy, remove)}
        {...item}
      />
    )
  }

  _onBookPress = (bookDescription) => {
    this.setState({ bookDescription }, () => this.props.openModal('factBook'));
  }

  _renderBook = ({item}) => {
    const { copyToClipboard, removeFavorite } = this.props;
    const copy = () => copyToClipboard(item.title);
    const remove = () => removeFavorite(item.id, 'books');
    return (
      <BookCard
        book={item}
        onBookPress={this._onBookPress}
        menuOptions={createCardMenuOptions(item, item.title, copy, remove)}
      />
    );
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
        color={COLORS.headerIcon}
        underlayColor={COLORS.underlay}
        iconStyle={styles.categoriesIcon}
        containerStyle={styles.categoriesIconContainer}
        onPress={this._openCategoriesModal}
      />
    )
  }

  _onSearchChange = (text) => {
    this.props.changeSearch(text);
  }

  _renderSearch = () => {
    const { search } = this.props;
     return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={this._onSearchChange}
          placeholder='Search in Favorites'
          underlineColorAndroid='transparent'
        />
      </View>
    )
  }

  render() {
    const { navigation, categories, facts, articles, videos, 
      books, toggleCategory, removeFavorite, copyToClipboard } = this.props;

    const { selectedVideoId, bookDescription } = this.state;

    return (
      <View style={styles.screenContainer}>
        <Header
          navigation={navigation}
          leftComponent={<ArrowBack navigation={navigation} />}
          centerComponent={this._renderSearch()}
          rightComponent={this._categoriesIcon()}
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

          { categories.videos &&
            <View style={styles.categoryContainer}>
              <View style={styles.categoryLabelContainer}>
                <Text style={styles.categoryLabel}>
                  VIDEOS
                </Text>
              </View>
              <Favorites
                data={videos}
                category='videos'
                renderFavorite={this._renderVideo}
              />
              <VideoModal 
                videoUrl={VIDEO_ROOT_URL+selectedVideoId}
              />
            </View>
          }
          
          { categories.books &&
            <View style={styles.categoryContainer}>
              <View style={styles.categoryLabelContainer}>
                <Text style={styles.categoryLabel}>
                  BOOKS
                </Text>
              </View>
              <Favorites
                data={books}
                category='books'
                renderFavorite={this._renderBook}
              />
              <BookModal
                bookDescription={bookDescription}
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

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',  
    borderRadius: 5
  },
  categoryContainer: {
    flex: 1,
    backgroundColor: COLORS.screenBody
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
    backgroundColor: '#ddd'
  },
  categoryLabelContainer: {
    flex: 1,
    backgroundColor: COLORS.greyDark
  },
  categoryLabel: {
    paddingVertical: 7,
    paddingLeft: 20,
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold'
  }
});


const mapStateToProps = ({ favorite }) => {
  const { search, categories, facts,
    articles, videos, books } = favorite;
  return {
    search,
    categories,
    facts: filterBySearch(facts, search, ['text'] ),
    articles: filterBySearch(articles, search, ['title'] ),
    videos: filterBySearch(videos, search, ['title'] ),
    books: filterBySearch(books, search, ['title', 'description', 'textSnippet'] )
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


export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);