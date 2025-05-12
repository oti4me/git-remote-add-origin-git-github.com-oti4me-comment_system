import { describe, it, expect, vi } from 'vitest';
import { IconWrapper } from '../IconWrapper';
import { renderComponentWithProvider } from '../../../utils/testUtils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('IconWrapper', () => {
  it('renders children correctly', () => {
    renderComponentWithProvider(
      <IconWrapper>
        <span data-testid="test-child">Test Content</span>
      </IconWrapper>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    renderComponentWithProvider(
      <IconWrapper onClick={handleClick}>
        <span>Click me</span>
      </IconWrapper>
    );

    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies background styles when hasBackground is true', () => {
    renderComponentWithProvider(
      <IconWrapper hasBackground={true}>
        <span>Content</span>
      </IconWrapper>
    );

    const wrapper = screen.getByText('Content').parentElement;
    expect(wrapper).toHaveClass('bg-gray-200');
  });

  it('does not apply background styles when hasBackground is false', () => {
    renderComponentWithProvider(
      <IconWrapper hasBackground={false}>
        <span>Content</span>
      </IconWrapper>
    );

    const wrapper = screen.getByText('Content').parentElement;
    expect(wrapper).not.toHaveClass('bg-gray-200');
  });

  it('applies additional className when provided', () => {
    renderComponentWithProvider(
      <IconWrapper className="test-class">
        <span>Content</span>
      </IconWrapper>
    );

    const wrapper = screen.getByText('Content').parentElement;
    expect(wrapper).toHaveClass('test-class');
  });

  it('adds button role when onClick is provided', () => {
    renderComponentWithProvider(
      <IconWrapper onClick={() => { }}>
        <span>Clickable</span>
      </IconWrapper>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
