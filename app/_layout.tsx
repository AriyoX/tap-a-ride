import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useColorScheme } from '@/components/useColorScheme';
import { Stack } from 'expo-router';
import { Pressable, View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

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
  const colorScheme = useColorScheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#1a1a1a',
          width: 240,
          paddingHorizontal: 10,
          paddingTop: 20,
          borderRadius: 0,
        },
        drawerLabelStyle: {
          color: '#fff',
          fontSize: 14,
          marginLeft: -8,
        },
        drawerItemStyle: {
          borderRadius: 6,
          marginVertical: 2,
          paddingVertical: 4,
        },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#888',
        drawerActiveBackgroundColor: '#333',
      }}
    >
      <Drawer.Screen 
        name="index" 
        component={require('./index').default}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({color, size}) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}
      />
      {/* <Drawer.Screen 
        name="profile" 
        component={require('./profile').default}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({color, size}) => (
            <Ionicons name="person" size={size} color={color} />
          )
        }}
      /> */}
      {/* Add more drawer screens as needed */}
    </Drawer.Navigator>
  );
}