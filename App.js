/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Accounts from './views/Accounts';
import Analyzes from './views/Analyzes';
import Look from './views/Look';
import Out from './views/Out';

import Login from './views/login';
import Welcome from './views/Welcome';

/* 
createBottomTabNavigator 用于创建页面底部的标签导航，可以在不同路由之间进行切换
*/
// 映射路由名称到路由配置
const bottomTab = createBottomTabNavigator({
  Accounts: {
    screen: Accounts,
    navigationOptions: {
      // 底部标签的名称（字符串）
      tabBarLabel: '记账',
      tabBarIcon: (({ tintColor }) => <Icon name="toll" color={tintColor} />)
    }
  },
  Analyzes: {
    screen: Analyzes,
    navigationOptions: {
      tabBarLabel: '分析报告',
      tabBarIcon: (({ tintColor }) => <Icon name="view-headline" color={tintColor} />)
    }
  },
  Look: {
    screen: Look,
    navigationOptions: {
      tabBarLabel: '查看流水',
      tabBarIcon: (({ tintColor }) => <Icon name="explore" color={tintColor} />)
    }
  },
  Out: {
    screen: Out,
    navigationOptions: {
      tabBarLabel: '退出',
      tabBarIcon: (({ focused, tintColor }) => {
        let iconName = focused ? 'account-circle' : 'transfer-within-a-station';
        return <Icon name={iconName} color={tintColor} />
      })
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: '#3D6DCC',
    inactiveTintColor: '#fff',
    labelStyle: {
      fontSize: 16,
    },
    tabStyle: {
      fontSize: 16,
      color: 'red'
    },
    // adaptive: true,
    style: {
      backgroundColor: 'black',
    },
  },
});

/* 
// 底部的导航必须用 createAppContainer 包裹,作为项目的根组件
const App = createAppContainer(bottomTab); */

// createStackNavigatior 为应用程序提供一种在每个新屏幕放置在堆栈顶部的屏幕之间转换的方法。
const TITLE_OFFSET = Platform.OS === 'ios' ? 70 : 56;
const statckNav = createStackNavigator({
  welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null
    }
  },
  login: {
    screen: Login,
    navigationOptions: {
      headerTitle: '登录',
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
      },
      headerTitleContainerStyle: {
        left: TITLE_OFFSET,
        right: TITLE_OFFSET,
      }
    }
  },
  // 嵌套路由导航，此处嵌套了一个底部导航
  home: {
    screen: bottomTab,
    navigationOptions: {
      header: null
    }
  }
})
const App = createAppContainer(statckNav);
// 堆栈导航必须用 createAppContainer 包裹,作为项目的根组件

// const styles = StyleSheet.create({
// });
export default App;