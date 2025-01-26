import { useEffectOnce } from 'react-native-use';
import { Text } from 'react-native';

export default function EffectOnce() {
  useEffectOnce(() => {
    console.log('Running effect once on mount');

    return () => {
      console.log('Running clean-up of effect on unmount');
    };
  });

  return <Text>This is useEffectOnce</Text>;
}
