import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useColorScheme } from '@/components/useColorScheme';
import { Stack } from 'expo-router';
import { Pressable, View, Image, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        marginBottom: 8,
      }}>
        <Image 
          source={require('../assets/images/favicon.png')}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            marginBottom: 12,
          }}
        />
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
          Hi, Roger
        </Text>
        <Text style={{ color: '#888', fontSize: 12 }}>
          Welcome back!
        </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  return (
    <>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation, route }) => ({
          headerShown: route.name !== 'index',
          headerTitle: () => (
            <Text style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '600',
              textTransform: 'capitalize'
            }}>
              {route.name}
            </Text>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('index')}
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          drawerStyle: {
            backgroundColor: '#1a1a1a',
            width: 270,
            paddingHorizontal: 10,
            paddingTop: 20,
            borderRadius: 0,
          },
          drawerLabelStyle: {
            color: '#fff',
            fontSize: 14,
            marginLeft: -4,
          },
          drawerItemStyle: {
            borderRadius: 6,
            marginVertical: 2,
            paddingVertical: 4,
          },
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#888',
          drawerActiveBackgroundColor: '#333',
        })}
      >
        {/* Main */}
        <Drawer.Screen 
          name="index" 
          component={require('./index').default}
          options={{
            drawerItemStyle: { display: 'none' } // Hide from drawer
          }}
        />

        {/* Rides */}
        <Drawer.Screen 
          name="history" 
          component={require('./history').default}
          options={{
            drawerLabel: 'Ride History',
            drawerIcon: ({color, size}) => (
              <Ionicons name="time" size={size} color={color} />
            )
          }}
        />
        <Drawer.Screen 
          name="scheduled" 
          component={require('./scheduled').default}
          options={{
            drawerLabel: 'Scheduled Rides',
            drawerIcon: ({color, size}) => (
              <Ionicons name="calendar" size={size} color={color} />
            )
          }}
        />

        {/* Vehicle Management */}
        <Drawer.Screen 
          name="vehicles" 
          component={require('./vehicles').default}
          options={{
            drawerLabel: 'My Vehicles',
            drawerIcon: ({color, size}) => (
              <Ionicons name="car" size={size} color={color} />
            )
          }}
        />

        {/* User */}
        <Drawer.Screen 
          name="profile" 
          component={require('./profile').default}
          options={{
            drawerLabel: 'Profile',
            drawerIcon: ({color, size}) => (
              <Ionicons name="person" size={size} color={color} />
            )
          }}
        />

        <Drawer.Screen 
          name="inbox" 
          component={require('./inbox').default}
          options={{
            drawerLabel: 'Inbox',
            drawerIcon: ({color, size}) => (
              <Ionicons name="mail" size={size} color={color} />
            )
          }}
        />

        {/* Payment & Support */}
        <Drawer.Screen 
          name="payment" 
          component={require('./payment').default}
          options={{
            drawerLabel: 'Payment Methods',
            drawerIcon: ({color, size}) => (
              <Ionicons name="card" size={size} color={color} />
            )
          }}
        />
        
        <Drawer.Screen 
          name="contact" 
          component={require('./contact').default}
          options={{
            drawerLabel: 'Contact Us',
            drawerIcon: ({color, size}) => (
              <Ionicons name="call" size={size} color={color} />
            )
          }}
        />
      </Drawer.Navigator>
    </>
  );
}