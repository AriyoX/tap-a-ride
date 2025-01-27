import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Text, View } from '@/components/Themed';
import { TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function TabOneScreen() {
  const [userRole, setUserRole] = useState('rider'); // 'rider' or 'driver'

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      
      {/* Address Input Overlay */}
      <View style={styles.overlay}>
        {/* Role Switcher */}
        <View style={styles.roleSwitcher}>
          <TouchableOpacity 
            style={[styles.roleTab, userRole === 'rider' && styles.activeTab]}
            onPress={() => setUserRole('rider')}
          >
            <Text style={[styles.roleText, userRole === 'rider' && styles.activeText]}>Rider</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.roleTab, userRole === 'driver' && styles.activeTab]}
            onPress={() => setUserRole('driver')}
          >
            <Text style={[styles.roleText, userRole === 'driver' && styles.activeText]}>Driver</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.greeting}>Hi Roger,</Text>
        <Text style={styles.question}>
          {userRole === 'rider' ? 'Where are you going today?' : 'Where are you driving to?'}
        </Text>
        
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput}
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
});