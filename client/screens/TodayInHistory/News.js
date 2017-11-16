import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';
import { connect } from 'react-redux';

import { fetchNews } from './actions';

// COMPONENTS
import NewsCard from '../../components/NewsCard';
import Loader from '../../components/Loader';
import NetworkProblem from '../../components/NetworkProblem';

import HEADER_HEIGHT from '../../constants/components';
import gStyles from '../../styles';


class News extends Component {
  static defaultProps = {
    lastTimeFetched: 0,
    isOnline: false,
    articles: []
  }

  componentDidMount() {
    const { fetchNews, articles, isOnline, lastTimeFetched } = this.props;
    const diff = new Date().getTime() - lastTimeFetched;
    const allowedDiff = 1000*60*60*2; // 2 hours in miliseconds
    if (diff > allowedDiff) {
      console.log('DIFFERENCE')
      console.log(diff)
    }
    if (articles.length === 0) {
      console.log('LENGTH 0')
    }
    if ((diff > allowedDiff) || articles.length === 0 ) {
      fetchNews();
    } 
  }

  componentWillReceiveProps(nextProps) {
    const { fetchNews, articles, isOnline, lastTimeFetched } = this.props;
    const didConnect = !isOnline && nextProps.isOnline;
    if (didConnect && nextProps.articles.length === 0) {
      fetchNews();
    }
  }

  _renderNews = (articles) => {
    return articles.map((article, i) => {
      return <NewsCard key={i} {...article} />
    });
  }

  render() {
    const { articles, isLoading, isOnline } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    if (articles.length === 0 && !isOnline) {
      return <NetworkProblem />;
    }

    if (articles.length === 0) {
      return (
        <View style={gStyles.screenMiddle}>
          <Text>
            No news were found,
            please try again later.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.newsContainer}>
      	{ this._renderNews(articles) }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  newsContainer: {
    flex: 1,
    marginTop: HEADER_HEIGHT
  }
});

const mapStateToProps = (
  { news: { isLoading, lastTimeFetched, articles }, offline}) => (
    {
      articles,
      isLoading,
      lastTimeFetched,
      isOnline: offline.online
    }
)

const mapDispatchToProps = (dispatch) => ({
  fetchNews: () => {
    dispatch(fetchNews());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(News);