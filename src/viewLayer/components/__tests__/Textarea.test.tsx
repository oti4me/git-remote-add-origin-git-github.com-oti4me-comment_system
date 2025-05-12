import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Textarea } from '../Textarea';
import { renderComponentWithProvider } from '../../../utils/testUtils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe.only('Textarea', () => {
  const mockOnChange = vi.fn();
  const mockRef = { current: null };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.only('renders with placeholder', () => {
    renderComponentWithProvider(
      <Textarea
        placeholder="Enter text..."
        text=""
        ref={mockRef}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  it('displays provided text', () => {
    renderComponentWithProvider(
      <Textarea
        placeholder="Enter text..."
        text="Test content"
        ref={mockRef}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByDisplayValue('Test content')).toBeInTheDocument();
  });

  it('handles text changes', async () => {
    renderComponentWithProvider(
      <Textarea
        placeholder="Enter text..."
        text=""
        ref={mockRef}
        onChange={mockOnChange}
      />
    );

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'New text');

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('applies correct styles', () => {
    renderComponentWithProvider(
      <Textarea
        placeholder="Enter text..."
        text=""
        ref={mockRef}
        onChange={mockOnChange}
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(
      'min-h-[100px]',
      'w-full',
      'rounded-2xl',
      'border',
      'border-gray-300'
    );
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    renderComponentWithProvider(
      <Textarea
        placeholder="Enter text..."
        text=""
        ref={ref}
        onChange={mockOnChange}
      />
    );

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
