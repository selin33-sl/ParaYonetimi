import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DataList} from '../components/DataList';

const Tab = createMaterialTopTabNavigator();

export const MyTabs = ({updateChartData}) => {
  const handleTabChange = type => {
    updateChartData(type);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: 'black', height: 2},
        tabBarLabelStyle: {fontSize: 14},
        swipeEnabled: false,
      }}
      screenListeners={{
        tabPress: e => {
          const type = e.target.split('-')[0];
          handleTabChange(type);
        },
      }}>
      <Tab.Screen
        name="Tümü"
        component={DataList}
        initialParams={{type: 'Tümü'}}
      />
      <Tab.Screen
        name="Gelir"
        component={DataList}
        initialParams={{type: 'Gelir'}}
      />
      <Tab.Screen
        name="Gider"
        component={DataList}
        initialParams={{type: 'Gider'}}
      />
    </Tab.Navigator>
  );
};
