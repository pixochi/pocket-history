import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import { WebBrowser } from 'expo';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// COMPONENTS
import Banner from '../../components/AdMob';
import Loader from '../../components/Loader';
import NewsCard from '../../components/NewsCard';
import NetworkProblem from '../../components/NetworkProblem';

import { fetchNews, changeFactsFilter } from './actions';
import { toApiNewsDate } from '../../utils/date';
import { filterBySearch, sortByDate } from '../../utils/filters';

import { HEADER_HEIGHT, COLORS } from '../../constants/components';
import gStyles from '../../styles';


const NEWS_ROOT_URL = 'http://news.bbc.co.uk/onthisday/hi/dates/stories/';

class News extends PureComponent {

  static propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object),
    fetchNews: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isOnline: PropTypes.bool,   
    lastTimeFetched: PropTypes.number.isRequired,
    selectedDate: PropTypes.object.isRequired
  }

  static defaultProps = {
    articles: [],
    lastTimeFetched: 0,
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
    const { selectedDate } = this.props;
    const newsDate = toApiNewsDate(selectedDate.timestamp);
    const onThisDayNewsUrl = NEWS_ROOT_URL + newsDate;
    WebBrowser.openBrowserAsync(onThisDayNewsUrl);
  }

  _renderNews = (articles) => {
    return articles.map((article, i) => {
      const News = <NewsCard key={i} {...article} />
      if (i && i % 9 === 0) {
        return (
          <View key={i}>
            <Banner />
            { News }
          </View>
        )
      }
      return News;
    });
  }

  render() {
    const { filteredArticles, allArticles, isLoading, isOnline } = this.props;

    if (true) {
      return <Loader />;
    }

    if (allArticles.length === 0 && !isOnline) {
      return <NetworkProblem />;
    }

    if (filteredArticles.length === 0) {
      return (
        <View style={gStyles.screenMiddle}>
          <Text style={styles.message}>
            No news were found,
            please try again later.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.newsContainer}>

        <View style={styles.newsLinksContainer}>
          <Text style={styles.newsLink} onPress={this._openNews}>
            News for { this.props.selectedDate.factDate }
          </Text>
        </View>
          
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
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
  newsLinksContainer: {
    margin: 7,
    marginBottom: 2,
    paddingLeft: 10,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    backgroundColor: COLORS.cardBackground
  },
  newsLink: {
    padding: 4,
    fontSize: 18, 
    color: COLORS.link,
    textDecorationLine: 'underline'
  },
  titleContainer: {
    margin: 7,
    marginBottom: 2,
    paddingLeft: 10,
    borderColor: COLORS.cardBorder,
    borderWidth: 1,
    backgroundColor: COLORS.cardBackground
  },
  titleText: {
    paddingHorizontal: 4,
    paddingVertical: 6,
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.greyDark
  },
  message: {
    fontSize: 20,
    color: COLORS.greyDark
  }
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