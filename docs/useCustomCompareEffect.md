# `useCustomCompareEffect`

A modified useEffect hook that accepts a comparator which is used for comparison on dependencies instead of reference equality.

## Usage

```jsx
import { useCustomCompareEffect } from 'react-native-use';
import isEqual from 'fast-deep-equal';
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
    (prevDeps, nextDeps) => isEqual(prevDeps, nextDeps)
  );

  return (
    <View>
      <Text>useCustomCompareEffect with deep comparison: {count}</Text>
    </View>
  );
}

```

## Reference

```ts
useCustomCompareEffect(effect: () => void | (() => void | undefined), deps: any[], depsEqual: (prevDeps: any[], nextDeps: any[]) => boolean);
```
