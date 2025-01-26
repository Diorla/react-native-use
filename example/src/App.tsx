import { View, StyleSheet } from 'react-native';
import CustomCompareEffect from './routes/custom-compare-effect';

export default function App() {
  return (
    <View style={styles.container}>
      <CustomCompareEffect />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
