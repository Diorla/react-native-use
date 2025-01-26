import { View, StyleSheet } from 'react-native';
import CustomCompareEffect from './routes/custom-compare-effect';
import DeepCompareEffect from './routes/deep-compare-effect';
import ShallowCompareEffect from './routes/shallow-compare-effect';
import EffectOnce from './routes/effect-once';

export default function App() {
  return (
    <View style={styles.container}>
      <CustomCompareEffect />
      <DeepCompareEffect />
      <ShallowCompareEffect />
      <EffectOnce />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
});
