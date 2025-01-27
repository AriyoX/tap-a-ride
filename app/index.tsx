import { StyleSheet, useColorScheme } from 'react-native';
import MapView from 'react-native-maps';
import { Text, View } from '@/components/Themed';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import * as Location from 'expo-location';

const mapDarkStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#242f3e" }]
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }]
  }
];

const mapLightStyle: { elementType?: string; featureType?: string; stylers: { color: string }[] }[] = []; // Default empty array for light mode

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [userRole, setUserRole] = useState('pooler'); // 'pooler' or 'driver'
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      // Request permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission denied',
          'Permission to access location was denied. Some features may be limited.'
        );
        return;
      }

      // Get current location
      try {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude
        });
      } catch (error) {
        Alert.alert('Error', 'Could not fetch location');
      }
    })();
  }, []);

  const zoomToUserLocation = async () => {
    if (!location) {
      try {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude
        });
        
        mapRef.current?.animateCamera({
          center: {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          },
          zoom: 15
        });
      } catch (error) {
        Alert.alert('Error', 'Could not fetch location');
      }
      return;
    }

    mapRef.current?.animateCamera({
      center: location,
      zoom: 15
    });
  };

  const isDarkMode = colorScheme === 'dark';
  const [pressed, setPressed] = useState(false);
  
  return (
    <View style={[styles.container, {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff'
    }]}>
      <MapView 
        ref={mapRef}
        style={styles.map} 
        showsUserLocation={true}
        customMapStyle={isDarkMode ? mapDarkStyle : mapLightStyle}
        initialRegion={location ? {
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : undefined}
      />
      
      <TouchableOpacity 
        style={[styles.menuButton, {
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
          transform: [{ scale: pressed ? 0.95 : 1 }],
        }]} 
        onPress={() => navigation.openDrawer()}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        activeOpacity={0.7}
        pressRetentionOffset={{ top: 20, left: 20, right: 20, bottom: 20 }}
      >
        <Ionicons 
          name="menu" 
          size={24} 
          color={isDarkMode ? '#fff' : '#000'} 
        />
      </TouchableOpacity>

      {/* Location Button */}
      <TouchableOpacity 
        style={styles.locationButton} 
        onPress={zoomToUserLocation}
      >
        <Ionicons name="locate" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Address Input Overlay */}
      <View style={[styles.overlay, {
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff'
      }]}>
        {/* Role Switcher */}
        <View style={styles.roleSwitcher}>
          <TouchableOpacity 
            style={[styles.roleTab, userRole === 'pooler' && styles.activeTab]}
            onPress={() => setUserRole('pooler')}
          >
            <Text style={[styles.roleText, userRole === 'pooler' && styles.activeText]}>Pooler</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.roleTab, userRole === 'driver' && styles.activeTab]}
            onPress={() => setUserRole('driver')}
          >
            <Text style={[styles.roleText, userRole === 'driver' && styles.activeText]}>Driver</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.greeting, {
          color: isDarkMode ? '#fff' : '#000'
        }]}>Hi Roger,</Text>
        <Text style={[styles.question, {
          color: isDarkMode ? '#888' : '#666'
        }]}>
          {userRole === 'pooler' ? 'Where are you going today?' : 'Where are you driving to?'}
        </Text>
        
        <View style={[styles.searchContainer, {
          backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5'
        }]}>
          <TextInput 
            style={[styles.searchInput, {
              color: isDarkMode ? '#fff' : '#000'
            }]}
            placeholder="Type the address..."
            placeholderTextColor="#666"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#666" />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 20, // Move up from bottom
    left: 20,   // Add space from left
    right: 20,  // Add space from right
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 20, // Round all corners
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  question: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  searchButton: {
    padding: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  roleSwitcher: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 25,
    padding: 4,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#3a3a3a',
  },
  roleText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationButton: {
    position: 'absolute',
    top: 100, // Below menu button
    left: 20,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});