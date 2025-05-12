import { renderHook, type RenderHookOptions } from '@testing-library/react';
import { getMockProvider } from './mockProvider';

export const renderHookWithProvider = <
  TProps extends Record<string, unknown> = Record<string, unknown>,
  TResult = unknown
>(
  callback: (props: TProps) => TResult,
  renderOptions?: RenderHookOptions<TProps>
) => {
  const route = 'test route';

  const wrapper = getMockProvider({
    route
  });

  const result = renderHook(callback, { wrapper, ...renderOptions });

  // Wait a tick for database initialization
  return {
    ...result,
    waitForNextUpdate: async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      return result;
    }
  };
};
