import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff'
    }]}>
      <Text style={[styles.text, {
        color: isDarkMode ? '#ffffff' : '#000000'
      }]}>Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 16,
  }
});