import { TabNavigator } from 'react-navigation';

// SCREENS
import Articles from './Articles';
import Books from './Books';
import Videos from './Videos';


const FactDetail = TabNavigator({
  articles: { screen: Articles },
  books: { screen: Books },
  videos: { screen: Videos },
}, { tabBarPosition: 'bottom', lazy: true, animationEnabled: false });


export default FactDetail;
