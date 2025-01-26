import { renderHook } from '@testing-library/react-native';
import useEffectOnce from '../useEffectOnce';

const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);

it('should run provided effect only once', () => {
  const { rerender } = renderHook(() => useEffectOnce(mockEffectCallback));
  expect(mockEffectCallback).toHaveBeenCalledTimes(1);

  rerender(1);
  expect(mockEffectCallback).toHaveBeenCalledTimes(1);
});

it('should run clean-up provided on unmount', () => {
  const { unmount } = renderHook(() => useEffectOnce(mockEffectCallback));
  expect(mockEffectCleanup).not.toHaveBeenCalled();

  unmount();
  expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
});
