import type { DependencyList, EffectCallback } from 'react';
import { shallowEqual } from 'shallow-equal';
import useCustomCompareEffect from './useCustomCompareEffect';

const isPrimitive = (val: any) => val !== Object(val);

const shallowEqualDepsList = (
  prevDeps: DependencyList,
  nextDeps: DependencyList
) =>
  prevDeps.every((dep, index) =>
    shallowEqual(dep as object, nextDeps[index] as object)
  );

const useShallowCompareEffect = (
  effect: EffectCallback,
  deps: DependencyList
) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!(deps instanceof Array) || !deps.length) {
      console.warn(
        '`useShallowCompareEffect` should not be used with no dependencies. Use React.useEffect instead.'
      );
    }

    if (deps.every(isPrimitive)) {
      console.warn(
        '`useShallowCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.'
      );
    }
  }

  useCustomCompareEffect(effect, deps, shallowEqualDepsList);
};

export default useShallowCompareEffect;
