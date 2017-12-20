import React from 'react';
import { TabNavigator } from 'react-navigation';

// SCREENS
import Articles from '../screens/FactDetail/Articles';
import Books from '../screens/FactDetail/Books';
import Videos from '../screens/FactDetail/Videos';
import Timeline from '../screens/FactDetail/Timeline';

import { tabBarOptions } from './common';


export const RoutesFactDetail = TabNavigator(
  {
    articles: { screen: Articles },
    videos: { screen: Videos },
    books: { screen: Books },
    timeline: { screen: Timeline }
  }, 
  { 
    tabBarPosition: 'bottom', 
    tabBarOptions,
    lazy: true, 
    animationEnabled: false,
  }
);