import { describe, it, expect, vi } from 'vitest';
import { Button } from '../Button';
import { renderComponentWithProvider } from '../../../utils/testUtils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('renders with text', () => {
    renderComponentWithProvider(<Button text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    renderComponentWithProvider(<Button text="Click me" onClick={handleClick} />);

    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports different variants', () => {
    renderComponentWithProvider(<Button text="Primary" variant="primary" />);
    const primaryButton = screen.getByText('Primary');
    expect(primaryButton).toHaveClass('bg-[#FF4500]');

    renderComponentWithProvider(<Button text="Secondary" variant="secondary" />);
    const secondaryButton = screen.getByText('Secondary');
    expect(secondaryButton).toHaveClass('bg-transparent');

    renderComponentWithProvider(<Button text="Tertiary" variant="tertiary" />);
    const tertiaryButton = screen.getByText('Tertiary');
    expect(tertiaryButton).toHaveClass('bg-transparent');
  });

  it('displays icon when provided', () => {
    const icon = <span data-testid="test-icon">icon</span>;
    renderComponentWithProvider(<Button text="With Icon" icon={icon} />);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('can be disabled', () => {
    renderComponentWithProvider(<Button text="Disabled" disabled={true} />);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
