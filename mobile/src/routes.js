import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Dashboard from './pages/Dashboard';
import SelectProvider from './pages/New/SelectProvider';
import SelectDateTime from './pages/New/SelectDateTime';
import Confirm from './pages/New/Confirm';

export default () =>
  createAppContainer(
    createBottomTabNavigator(
      {
        New: {
          screen: createStackNavigator(
            {
              SelectProvider,
              SelectDateTime,
              Confirm,
            },
            {
              defaultNavigationOptions: {
                headerTransparent: true,
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
              },
            }
          ),
          navigationOptions: {
            tabBarVisible: true,
            tabBarLabel: 'Agendar',
            tabBarIcon: (
              <Icon
                name="add-circle-outline"
                size={20}
                color="rgba(255, 255, 255, .6)"
              />
            ),
          },
        },
        Dashboard,
      },
      {
        resetOnBlur: true,
        tabBarOptions: {
          keyboardHidesTabBar: true,
          activeTintColor: '#FFF',
          inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
          style: {
            backgroundColor: '#323031',
          },
        },
      }
    )
  );
