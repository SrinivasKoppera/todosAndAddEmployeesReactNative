import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/homeScreen/homeScreen';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import ChatScreen from '../components/chatScreen/chatScreen';
import MapScreen from '../components/mapsScreen/mapScreen';
import ProfileScreen from '../components/profileScreen/profileScreen';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeModule = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Notes App',
          headerTitleStyle: {fontWeight: '900'},
          headerTitleAlign: 'center',
          // headerShown: false,
          headerLeft: () => {
            return (
              <Image
                style={styles.headerProfile}
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAb-vb97QXQeIb-chQJOKk3XouQGSsyrakSw&usqp=CAU',
                }}
                alt="profileImage"
              />
            );
          },
          headerRight: () => {
            return <Icon name="sort-desc" size={30} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'HOME') {
            iconName = 'home';
          } else if (route.name === 'PROFILE') {
            iconName = 'account';
          } else if (route.name === 'MAPS') {
            iconName = 'map';
          } else if (route.name === 'CHAT') {
            iconName = 'chat';
          }
          const iconSize = size + 12;
          return <MaterialIcon name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: '#FF5733',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {height: 80},
        tabBarHideOnKeyboard: true,
        unmountOnBlur: true,
      })}>
      <Tab.Screen
        name="HOME"
        component={HomeModule}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => {
            const labelStyle = {
              padding: 8,
              fontSize: 16,
              fontWeight: '600',
              // Add other common styles here
            };

            if (focused) {
              // Apply additional styles when tab is focused
              labelStyle.borderBottomWidth = 5;
              labelStyle.borderColor = '#FF5733';
              labelStyle.borderTopLeftRadius = 10;
              labelStyle.color = '#FF5733';
            }
            return <Text style={labelStyle}>HOME</Text>;
          },
        }}
      />
      <Tab.Screen
        name="CHAT"
        component={ChatScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => {
            const labelStyle = {
              padding: 8,
              fontSize: 16,
              fontWeight: '600',
              // Add other common styles here
            };

            if (focused) {
              // Apply additional styles when tab is focused
              labelStyle.borderBottomWidth = 5;
              labelStyle.borderColor = '#FF5733';
              labelStyle.borderTopLeftRadius = 10;
              labelStyle.color = '#FF5733';
            }
            return <Text style={labelStyle}>CHAT</Text>;
          },
        }}
      />
      <Tab.Screen
        name="MAPS"
        component={MapScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => {
            const labelStyle = {
              padding: 8,
              fontSize: 16,
              fontWeight: '600',
              // Add other common styles here
            };

            if (focused) {
              // Apply additional styles when tab is focused
              labelStyle.borderBottomWidth = 5;
              labelStyle.borderColor = '#FF5733';
              labelStyle.borderTopLeftRadius = 10;
              labelStyle.color = '#FF5733';
            }
            return <Text style={labelStyle}>MAPS</Text>;
          },
        }}
      />
      <Tab.Screen
        name="PROFILE"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({focused, color}) => {
            const labelStyle = {
              padding: 8,
              fontSize: 16,
              fontWeight: '600',
              // Add other common styles here
            };
            if (focused) {
              // Apply additional styles when tab is focused
              labelStyle.borderBottomWidth = 5;
              labelStyle.borderColor = '#FF5733';
              labelStyle.borderTopLeftRadius = 50;
              labelStyle.color = '#FF5733';
            }
            return <Text style={labelStyle}>PROFILE</Text>;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export const MainStack = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export const styles = StyleSheet.create({
  headerProfile: {
    borderRadius: 300,
    width: 50,
    height: 50,
  },
});
