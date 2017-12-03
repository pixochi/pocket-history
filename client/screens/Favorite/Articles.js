import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';

import { removeFavorite } from './actions';

import Favorites from './Favorites';
import ArticleCard from '../../components/ArticleCard';
import { copy, share, remove } from '../../components/utils/cardMenuOptions';


class FavoriteArticles extends PureComponent {

  _cardMenuOptions = ({id, link, title}) => {
    const { removeFavorite, copyToClipboard } = this.props.screenProps;
    const menuOptions = [
      copy({ onSelect: () => copyToClipboard(link), optionText: 'Copy Link' }),
      share({ message: title }),
      remove({ onSelect: () => removeFavorite(id, 'articles') })
    ]
    return menuOptions;
  }

  _renderArticle = ({item}) => {
    return (
      <ArticleCard
        {...item}
        menuOptions={this._cardMenuOptions(item)}
      />
    );
  }

  render() {
    const { articles } = this.props;
    return (
      <View style={styles.mainContainer}>
	      <Favorites 
          data={articles}
          category='articles'
          renderFavorite={this._renderArticle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
});

const mapStateToProps = ({ favorite }) => ({
  articles: favorite.articles
});


export default connect(mapStateToProps)(FavoriteArticles);