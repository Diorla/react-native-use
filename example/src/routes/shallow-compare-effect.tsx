import { useShallowCompareEffect } from 'react-native-use';
import { useState } from 'react';
import { View, Text } from 'react-native';

const useCounter = (initialValue: number) => {
  const [count, setCount] = useState(initialValue);
  const inc = (value: number) => {
    setCount((c) => c + value);
  };
  return [count, { inc }] as const;
};

export default function ShallowCompareEffect() {
  const [count, { inc: inc }] = useCounter(0);
  const options = { step: 2 };

  useShallowCompareEffect(() => {
    inc(options.step);
  }, [options]);

  return (
    <View>
      <Text>useShallowCompareEffect: {count}</Text>
    </View>
  );
}
