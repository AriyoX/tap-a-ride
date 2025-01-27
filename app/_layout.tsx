import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useColorScheme } from '@/components/useColorScheme';
import { Stack } from 'expo-router';
import { Pressable, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Clickable User Profile Section */}
        <Pressable
          onPress={() => props.navigation.navigate('profile')}
          style={({ pressed }) => [
            styles.profileContainer,
            { 
              borderBottomColor: isDarkMode ? '#333' : '#e0e0e0',
              backgroundColor: pressed ? (isDarkMode ? '#2a2a2a' : '#f0f0f0') : 'transparent'
            }
          ]}
        >
          <Image 
            source={require('../assets/images/favicon.png')}
            style={styles.profileImage}
          />
          <View>
            <Text style={[styles.profileName, { color: isDarkMode ? '#fff' : '#000' }]}>
              Hi, Roger
            </Text>
            <Text style={[styles.profileWelcome, { color: isDarkMode ? '#888' : '#666' }]}>
              Welcome back!
            </Text>
          </View>
        </Pressable>

        {/* Rest of the code remains the same */}
        {/* Drawer Items */}
        <View style={styles.drawerItems}>
          <DrawerItemList 
            {...props} 
          />
        </View>

        {/* Logout Section */}
        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [
              styles.logoutButton,
              { backgroundColor: pressed ? (isDarkMode ? '#333' : '#eee') : 'transparent' }
            ]}
            onPress={() => console.log('Logout')}
          >
            <Ionicons 
              name="log-out-outline" 
              size={20} 
              color={isDarkMode ? '#888' : '#666'} 
              style={styles.logoutIcon}
            />
            <Text style={[styles.logoutText, { color: isDarkMode ? '#888' : '#666' }]}>
              Log Out
            </Text>
          </Pressable>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <>
      <StatusBar 
        style={isDarkMode ? "light" : "dark"} 
        translucent 
        backgroundColor="transparent" 
      />
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation, route }) => ({
          headerShown: route.name !== 'index',
          headerTitle: () => (
            <Text style={[
              styles.headerTitle,
              { color: isDarkMode ? '#fff' : '#000' }
            ]}>
              {route.name}
            </Text>
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#333' : '#e0e0e0',
          },
          headerTintColor: isDarkMode ? '#fff' : '#000',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('index')}
              style={styles.backButton}
            >
              <Ionicons 
                name="arrow-back" 
                size={24} 
                color={isDarkMode ? '#fff' : '#000'} 
              />
            </TouchableOpacity>
          ),
          drawerStyle: {
            backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
            width: 270,
            paddingTop: 4,
          },
          drawerLabelStyle: {
            fontSize: 15,
            marginLeft: -8,
          },
          drawerItemStyle: {
            marginVertical: 4,
            paddingVertical: 4,
          },
          drawerActiveTintColor: isDarkMode ? '#fff' : '#000',
          drawerInactiveTintColor: isDarkMode ? '#888' : '#666',
          drawerActiveBackgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
          overlayColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        })}
      >
        {/* Your existing screens remain the same */}
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

        {/* User */}
        <Drawer.Screen 
          name="profile" 
          component={require('./profile').default}
          options={{
            drawerItemStyle: { display: 'none' }
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
          name="settings" 
          component={require('./settings').default}
          options={{
            drawerLabel: 'Settings',
            drawerIcon: ({color, size}) => (
              <Ionicons name="settings-outline" size={size} color={color} />
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

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileWelcome: {
    fontSize: 14,
  },
  drawerItems: {
    flex: 1,
    paddingHorizontal: 8,
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  logoutIcon: {
    marginRight: 12,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  backButton: {
    marginLeft: 16,
    padding: 8,
    borderRadius: 8,
  },
});