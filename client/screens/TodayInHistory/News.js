import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Linking
} from 'react-native';
import { connect } from 'react-redux';

import { fetchNews, changeFactsFilter } from './actions';

import { filterBySearch, sortByDate } from '../../utils/filters';

// COMPONENTS
import NewsCard from '../../components/NewsCard';
import Loader from '../../components/Loader';
import NetworkProblem from '../../components/NetworkProblem';

import { toApiNewsDate } from '../../utils/date';

import { HEADER_HEIGHT } from '../../constants/components';
import gStyles from '../../styles';


class News extends PureComponent {
  static defaultProps = {
    lastTimeFetched: 0,
    isOnline: false,
    articles: []
  }

  componentDidMount() {
    const { fetchNews, articles, isOnline, lastTimeFetched } = this.props;
    const diff = new Date().getTime() - lastTimeFetched;
    const allowedDiff = 1000*60*60*2; // 2 hours in miliseconds
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

  _openNews = () => {
    const NEWS_ROOT_URL = 'http://news.bbc.co.uk/onthisday/hi/dates/stories/';
    const { selectedDate } = this.props;
    const newsDate = toApiNewsDate(selectedDate.timestamp);
    const onThisDayNewsUrl = `${NEWS_ROOT_URL}${newsDate}`
    Linking.openURL(onThisDayNewsUrl);
  }

  _renderNews = (articles) => {
    return articles.map((article, i) => {
      return <NewsCard key={i} {...article} />
    });
  }

  render() {
    const { filteredArticles, allArticles, isLoading, isOnline } = this.props;

    if (isLoading) {
      return <Loader />;
    }

    if (allArticles.length === 0 && !isOnline) {
      return <NetworkProblem />;
    }

    if (filteredArticles.length === 0) {
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
        <View style={styles.titleContainer}>
          <Text style={styles.newsLink} onPress={this._openNews}>
            News for { this.props.selectedDate.factDate }
          </Text>
        
          <Text style={styles.title}>
            Latest news
          </Text>
        </View>
      	{ this._renderNews(filteredArticles) }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  newsContainer: {
    flex: 1,
    marginTop: HEADER_HEIGHT
  },
  titleContainer: {
    margin: 10
  },
  newsLink: {
    fontSize: 18,
    padding: 4,
    color: '#3581cf',
    textDecorationLine: 'underline'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 4,
    paddingTop:10,
    paddingBottom: 0,
    textAlign: 'left'
  },
});

const filterNews = (news, { search, sort }) => {
  let filteredNews = {...news};

  if (search) {
    filteredNews = filterBySearch(filteredNews, search, ['title', 'description']);
  }
  if (sort) {
    filteredNews = sortByDate(news, sort, 'link');
  }

  return filteredNews;  
}

const mapStateToProps = (
  { news: { isLoading, lastTimeFetched, articles }, offline, historyOnDay}) => (
    {
      allArticles: articles,
      filteredArticles: filterNews(articles, historyOnDay.filter),
      isLoading,
      lastTimeFetched,
      isOnline: offline.online,
      selectedDate: historyOnDay.selectedDate
    }
)

const mapDispatchToProps = (dispatch) => ({
  fetchNews: () => {
    dispatch(fetchNews());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(News);