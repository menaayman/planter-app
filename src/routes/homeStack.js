import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
} from '@react-navigation/native';
import {Image, TouchableHighlight, View, Text} from 'react-native';
import Home from '../screens/home';
import AddEditPlant from '../screens/addEditPlant';

import PlantDetails from '../screens/plantDetails';
import SymbiosisScreen from '../screens/symbiosis';
import GardenDesign from '../screens/gardenDesign';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};
function LogoTitle({home}) {
  return (
    <Image
      style={{
        height: 30,
        alignSelf: 'center',
        marginLeft: home ? -60 : 0,
      }}
      resizeMode={'contain'}
      source={require('../assets/images/planter_logo_words.png')}
    />
  );
}
function LogoIcon() {
  return (
    <Image
      style={{
        height: 30,
      }}
      resizeMode={'contain'}
      source={require('../assets/images/planter_icon.png')}
    />
  );
}
function AddIcon() {
  const specialNavigation = useNavigation();
  return (
    <Image
      style={{
        height: 30,
        marginRight: 10,
      }}
      resizeMode={'contain'}
      source={require('../assets/images/addNew.png')}
      onPress={() => specialNavigation.navigate('Details')}
    />
  );
}
function AddButton() {
  const specialNavigation = useNavigation();
  return (
    <TouchableHighlight
      style={{
        height: 30,
        marginRight: 10,
      }}
      onPress={() => specialNavigation.navigate('AddEditPlant')}>
      <View>
        <Image
          resizeMode={'contain'}
          source={require('../assets/images/addNew.png')}
        />
      </View>
    </TouchableHighlight>
  );
}
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#155E63',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          alignSelf: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          flex: 1,
          fontWeight: 'bold',
          textAlignVertical: 'center',
        },
      }}>
      <Stack.Screen
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerLeft: (props) => <LogoIcon {...props} />,
          headerRight: (props) => <AddButton {...props} />,
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerTitle: (props) => <LogoTitle home={true} {...props} />,
        }}
        name="Details"
        component={PlantDetails}
      />
      <Stack.Screen
        options={{
          headerTitle: (props) => <LogoTitle home={true} {...props} />,
        }}
        name="AddEditPlant"
        component={AddEditPlant}
      />
    </Stack.Navigator>
  );
}

function SymbiosisStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#155E63',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          alignSelf: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          flex: 1,
          fontWeight: 'bold',
          textAlignVertical: 'center',
        },
      }}>
      <Stack.Screen
        options={{
          headerTitle: (props) => <LogoTitle home={true} {...props} />,
          headerLeft: (props) => <LogoIcon {...props} />,
        }}
        name="SymbiosisHome"
        component={SymbiosisScreen}
      />
    </Stack.Navigator>
  );
}

function GardenDesignStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#155E63',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          alignSelf: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          flex: 1,
          fontWeight: 'bold',
          textAlignVertical: 'center',
        },
      }}>
      <Stack.Screen
        options={{
          headerTitle: (props) => <LogoTitle home={true} {...props} />,
          headerLeft: (props) => <LogoIcon {...props} />,
        }}
        name="GardenDesign"
        component={GardenDesign}
      />
    </Stack.Navigator>
  );
}
function MyTabs() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({focused}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = require('../assets/images/planter_icon.png');
            } else if (route.name === 'Symbiosis') {
              iconName = require('../assets/images/SymbiosisLoge.png');
            } else if (route.name === 'Garden Design') {
              iconName = require('../assets/images/gardenDesignLogo.png');
            }

            // You can return any component that you like here!
            return (
              <Image
                source={iconName}
                resizeMode={'contain'}
                style={{
                  height: 30,
                  width: 30,
                }}
              />
            );
          },
        })}
        tabBarOptions={{
          inactiveBackgroundColor: '#155E63',
          activeBackgroundColor: '#76B39D',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Symbiosis" component={SymbiosisStack} />
        <Tab.Screen name="Garden Design" component={GardenDesignStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default MyTabs;
