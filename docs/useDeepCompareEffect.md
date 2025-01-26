# `useDeepCompareEffect`

A modified useEffect hook that is using deep comparison on its dependencies instead of reference equality.

## Usage

```jsx
import { useDeepCompareEffect } from 'react-native-use';
import { useState } from 'react';
import { View, Text } from 'react-native';

const useCounter = (initialValue: number) => {
  const [count, setCount] = useState(initialValue);
  const inc = (value: number) => {
    setCount((c) => c + value);
  };
  return [count, { inc }] as const;
};

export default function DeepCompareEffect() {
  const [count, { inc: inc }] = useCounter(0);
  const options = { step: 2 };

  useDeepCompareEffect(() => {
    inc(options.step);
  }, [options]);

  return (
    <View>
      <Text>useDeepCompareEffect: {count}</Text>
    </View>
  );
}
```

## Reference

```ts
useDeepCompareEffect(effect: () => void | (() => void | undefined), deps: any[]);
```
