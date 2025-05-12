import { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { getMockProvider } from './mockProvider';
import { act } from '@testing-library/react';

export const renderComponentWithProviderAsync = async (
  ui: ReactElement,
  renderOptions?: Omit<RenderOptions, 'queries'>
) => {
  const route = 'test route';
  const wrapper = getMockProvider({ route });

  let rendered;
  await act(async () => {
    rendered = render(ui, { wrapper, ...renderOptions });
  });

  await act(async () => {
    await Promise.resolve();
  });

  return rendered!;
};
