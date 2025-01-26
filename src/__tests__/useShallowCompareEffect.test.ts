import { renderHook } from '@testing-library/react-native';
import { useEffect } from 'react';
import useShallowCompareEffect from '../useShallowCompareEffect';

let options1 = { max: 10, range: { from: 0, to: 10 } };
const options2 = { max: 10, range: { from: 0, to: 10 } };
const mockEffectNormal = jest.fn();
const mockEffectShallow = jest.fn();
const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);

it('should shallow compare dependencies', () => {
  const { rerender: rerenderNormal } = renderHook(() =>
    useEffect(mockEffectNormal, [options1, options2])
  );
  const { rerender: rerenderShallow } = renderHook(() =>
    useShallowCompareEffect(mockEffectShallow, [options1, options2])
  );

  expect(mockEffectNormal).toHaveBeenCalledTimes(1);
  expect(mockEffectShallow).toHaveBeenCalledTimes(1);

  options1 = { max: 10, range: options1.range };
  rerenderShallow(2);
  rerenderNormal(2);

  expect(mockEffectNormal).toHaveBeenCalledTimes(2);
  expect(mockEffectShallow).toHaveBeenCalledTimes(1);

  options1 = { max: 10, range: { from: 0, to: 10 } };
  rerenderNormal(2);
  rerenderShallow(2);

  expect(mockEffectNormal).toHaveBeenCalledTimes(3);
  expect(mockEffectShallow).toHaveBeenCalledTimes(2);
});

it('should run clean-up provided on unmount', () => {
  const { unmount } = renderHook(() =>
    useShallowCompareEffect(mockEffectCallback, [options1, options2])
  );
  expect(mockEffectCleanup).not.toHaveBeenCalled();

  unmount();
  expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
});
