import * as React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './screens/HomeScreen';
import {Provider} from 'react-redux';
import {store} from './redux/store';

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </Provider>
  );
};
