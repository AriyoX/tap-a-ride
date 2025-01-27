import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function PaymentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride History</Text>
      <View style={styles.listContainer}>
        <Text style={styles.emptyText}>No rides yet</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  }
});