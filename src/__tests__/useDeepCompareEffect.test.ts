import { renderHook } from '@testing-library/react-native';
import { useEffect } from 'react';
import useDeepCompareEffect from '../useDeepCompareEffect';

let options = { max: 10 };
const mockEffectNormal = jest.fn();
const mockEffectDeep = jest.fn();
const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);

it('should run provided object once', () => {
  const { rerender: rerenderNormal } = renderHook(() =>
    useEffect(mockEffectNormal, [options])
  );
  const { rerender: rerenderDeep } = renderHook(() =>
    useDeepCompareEffect(mockEffectDeep, [options])
  );

  expect(mockEffectNormal).toHaveBeenCalledTimes(1);
  expect(mockEffectDeep).toHaveBeenCalledTimes(1);

  options = { max: 10 };
  rerenderDeep(5);
  rerenderNormal(1);

  expect(mockEffectNormal).toHaveBeenCalledTimes(2);
  expect(mockEffectDeep).toHaveBeenCalledTimes(1);

  options = { max: 10 };
  rerenderNormal(1);
  rerenderDeep(5);

  expect(mockEffectNormal).toHaveBeenCalledTimes(3);
  expect(mockEffectDeep).toHaveBeenCalledTimes(1);
});

it('should run clean-up provided on unmount', () => {
  const { unmount } = renderHook(() =>
    useDeepCompareEffect(mockEffectCallback, [options])
  );
  expect(mockEffectCleanup).not.toHaveBeenCalled();

  unmount();
  expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
});
