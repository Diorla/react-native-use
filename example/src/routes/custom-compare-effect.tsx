import { useCustomCompareEffect } from 'react-native-use';
import isDeepEqualReact from 'fast-deep-equal/react';
import { useState } from 'react';
import { View, Text } from 'react-native';

const useCounter = (initialValue: number) => {
  const [count, setCount] = useState(initialValue);
  const inc = (value: number) => {
    setCount((c) => c + value);
  };
  return [count, { inc }] as const;
};

export default function CustomCompareEffect() {
  const [count, { inc: inc }] = useCounter(0);
  const options = { step: 2 };

  useCustomCompareEffect(
    () => {
      inc(options.step);
    },
    [options],
    (prevDeps, nextDeps) => isDeepEqualReact(prevDeps, nextDeps)
  );

  return (
    <View>
      <Text>useCustomCompareEffect with deep comparison: {count}</Text>
    </View>
  );
}
